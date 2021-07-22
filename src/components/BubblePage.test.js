import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, wait, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import fetchColorServices from "../services/fetchColorService";
import userEvent from "@testing-library/user-event";
jest.mock("../services/fetchColorService");

const testColor = [
  {
    color: "blue",
    code: { hex: "#7fffd4" },
    id: 1,
  },
];

test("Renders without errors", () => {
  fetchColorServices.mockResolvedValueOnce(testColor);

  render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {
  //Keep in mind that our service is called on mount for this component.
  fetchColorServices.mockResolvedValueOnce(testColor);

  render(<BubblePage />);

  await waitFor(() => {
    const colors = screen.getAllByTestId("color");
    expect(colors).toHaveLength(1);
  });
});
