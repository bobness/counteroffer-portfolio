import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navigation from "../components/Navigation";

// import useApi from "../hooks/useApi";
// jest.mock("../hooks/useApi");

const [currentPage, setCurrentPage] = useState("one");

const mockNavigation = (
  <Navigation
    items={["one", "two"]}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  >
    <div key="one">oneBody</div>
    <div key="two">twoBody</div>
  </Navigation>
);

describe("Navigation", () => {
  const expectNavigationLink = async (text: string) => {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe("a");
    expect(element.innerHTML).toEqual(text);
  };
  test("Renders the navigation links", async () => {
    render(mockNavigation);
    await expectNavigationLink("one");
    await expectNavigationLink("two");
  });

  test("Renders first item on load", async () => {
    render(mockNavigation);
    const oneBody = await screen.findByText("oneBody");
    expect(oneBody).toBeInTheDocument();
    expect(oneBody.innerHTML).toEqual("oneBody");
  });

  test("Renders second item on click", async () => {
    render(mockNavigation);
    const twoLink = await screen.findByText("two");
    fireEvent.click(twoLink);
    const twoBody = await screen.findByText("twoBody");
    expect(twoBody).toBeInTheDocument();
    expect(twoBody.innerHTML).toEqual("twoBody");
  });
});
