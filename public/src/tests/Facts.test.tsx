import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Facts from "../components/Facts";

import { mockFacts } from "../hooks/__mocks__/axios";

describe("Facts", () => {
  test("Renders mock facts", async () => {
    render(<Facts data={mockFacts} />);
    const factKeyElement = await screen.findByText(/factKey/i);
    expect(factKeyElement).toBeInTheDocument();
    expect(factKeyElement.tagName.toLowerCase()).toBe("td");
    expect(factKeyElement.innerHTML).toEqual("factKey");
    const factValueElement = factKeyElement.nextElementSibling as HTMLElement;
    expect(factValueElement).toBeInTheDocument();
    expect(factValueElement!.tagName.toLowerCase()).toBe("td");
    expect(factValueElement!.innerHTML).toEqual("factValue");
  });
});
