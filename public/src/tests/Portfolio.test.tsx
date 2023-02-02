import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../components/Portfolio";

test("renders learn react link", () => {
  render(<Portfolio user_id={1} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
