import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";

const testColor = {
  color: "blue",
  code: { hex: "#7fffd4" },
  id: 1,
};
test("Renders without errors with blank color passed into component", () => {
  render(<Color color={testColor} />);
});

test("Renders the color passed into component", () => {
  render(<Color color={testColor} />);
  const color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const handleDelete = jest.fn();
  const toggleEdit = jest.fn();
  render(
    <Color
      deleteColor={handleDelete}
      toggleEdit={toggleEdit}
      color={testColor}
    />
  );
  const deleteKey = screen.getByTestId("delete");
  userEvent.click(deleteKey);
  expect(handleDelete).toBeCalled();
  expect(toggleEdit).toBeCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
  const setEditColor = jest.fn();
  const toggleEdit = jest.fn();
  render(
    <Color
      setEditColor={setEditColor}
      toggleEdit={toggleEdit}
      color={testColor}
    />
  );
  const colorKey = screen.getByTestId("color");
  userEvent.click(colorKey);
  expect(setEditColor).toBeCalled();
  expect(toggleEdit).toBeCalled();
});
