import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders todo", () => {
  render(<App />);
  const linkElement = screen.getByText(/This is the To-Do application/i);
  expect(linkElement).toBeInTheDocument();
});
