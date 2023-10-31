import { expect, test } from "vitest";

import { render, screen } from "~/test/utils";
import { ActionButton } from "./action-button";

test("renders button with caption", () => {
  render(<ActionButton>Test Caption</ActionButton>);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Test Caption");
});
