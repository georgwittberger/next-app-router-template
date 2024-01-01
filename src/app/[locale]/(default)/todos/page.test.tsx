import { expect, test } from "vitest";

import type { Todo } from "~/server/db/schema";
import { createTrpcQueryHandler, server } from "~/test/server";
import { render, screen, testLocale, within } from "~/test/utils";
import ToDosPage from "./page";

const pageModel = {
  getMainHeading: () => screen.getByRole("heading", { level: 1 }),
  getHomeLink: () =>
    screen.getByRole("link", {
      name: "Back to Homepage",
    }),
  querySignInButton: () =>
    screen.queryByRole("button", {
      name: "sign in",
    }),
  findTodoItems: async (): Promise<HTMLElement[]> => {
    const todoList = await screen.findByTestId("todo-list");
    return within(todoList).findAllByRole("listitem");
  },
};

const testSession = {
  user: { id: "test-user" },
  expires: new Date().toISOString(),
};

test("renders main heading", () => {
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>);
  const headingElement = pageModel.getMainHeading();
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent("Your ToDos");
});

test("renders link to home page", () => {
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>);
  const homeLinkElement = pageModel.getHomeLink();
  expect(homeLinkElement).toBeInTheDocument();
  expect(homeLinkElement).toHaveAttribute("href", "/en");
});

test("renders link to sign in page for anonymous users", () => {
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>);
  const signInButtonElement = pageModel.querySignInButton();
  expect(signInButtonElement).not.toBeNull();
});

test("does not render link to sign in page for authenticated users", () => {
  server.use(createTrpcQueryHandler("todos.list", () => []));
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>, {
    session: testSession,
  });
  const signInButtonElement = pageModel.querySignInButton();
  expect(signInButtonElement).toBeNull();
});

test("renders list of todo items", async () => {
  const testTodoItems: Todo[] = [
    {
      id: 2,
      title: "Second Todo",
      createdAt: new Date(2024, 0, 1, 10, 45, 0),
      userId: testSession.user.id,
    },
    {
      id: 1,
      title: "First Todo",
      createdAt: new Date(2024, 0, 1, 9, 30, 0),
      userId: testSession.user.id,
    },
  ];
  server.use(createTrpcQueryHandler("todos.list", () => testTodoItems));
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>, {
    session: testSession,
  });
  const todoItems = await pageModel.findTodoItems();
  expect(todoItems).toHaveLength(2);
  expect(todoItems[0]).toHaveTextContent("Second Todo");
  expect(todoItems[0]).toHaveTextContent("10:45");
  expect(todoItems[1]).toHaveTextContent("First Todo");
  expect(todoItems[1]).toHaveTextContent("09:30");
});
