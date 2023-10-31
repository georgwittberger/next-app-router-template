import { expect, test } from "vitest";

import { render, screen, testLocale } from "~/test/utils";
import HomePage from "./page";

const pageModel = {
  getMainHeading: () => screen.getByRole("heading", { level: 1 }),
  getTodosLink: () =>
    screen.getByRole("link", {
      name: "Go to ToDo list",
    }),
};

test("renders main heading", () => {
  render(<HomePage params={{ locale: testLocale }}></HomePage>);
  const headingElement = pageModel.getMainHeading();
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent("Welcome to Next ToDo App");
});

test("renders link to todos page", () => {
  render(<HomePage params={{ locale: testLocale }}></HomePage>);
  const todosLinkElement = pageModel.getTodosLink();
  expect(todosLinkElement).toBeInTheDocument();
  expect(todosLinkElement).toHaveAttribute("href", "/en/todos");
});
