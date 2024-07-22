import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navigation from "../components/Navigation";

const mockNavigation = <Navigation items={["one", "two"]} />;

// TODO: refactor the tests now that navigation is very different
xdescribe("Navigation", () => {
  const expectNavigationLink = async (text: string) => {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe("button");
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
