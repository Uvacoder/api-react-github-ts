import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders app screen", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
