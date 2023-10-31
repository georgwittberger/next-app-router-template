import { expect, test } from "vitest";

import { render, screen, testLocale } from "~/test/utils";
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
  render(<ToDosPage params={{ locale: testLocale }}></ToDosPage>, {
    session: testSession,
  });
  const signInButtonElement = pageModel.querySignInButton();
  expect(signInButtonElement).toBeNull();
});
