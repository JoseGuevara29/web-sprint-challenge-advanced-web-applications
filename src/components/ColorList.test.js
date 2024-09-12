import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";
import EditMenu from "./EditMenu";
import userEvent from "@testing-library/user-event";

const testColor = {
  color: "blue",
  code: { hex: "#7fffd4" },
  id: 1,
};
const noColor = [];

test("Renders an empty list of colors without errors", () => {
  render(<ColorList colors={noColor} />);
});

test("Renders a list of colors without errors", () => {
  render(<ColorList colors={[testColor]} />);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const { rerender } = render(
    <ColorList editing={true} colors={[testColor]} />
  );
  expect(screen.getByTestId(/edit_menu/i)).toBeInTheDocument();

  rerender(<ColorList editing={false} colors={[testColor]} />);
  expect(screen.queryByTestId(/edit_menu/i)).not.toBeInTheDocument();
});
