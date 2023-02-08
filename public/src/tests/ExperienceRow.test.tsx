import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ExperienceRow from "../components/ExperienceRow";

import { mockExperiences } from "../hooks/__mocks__/useApi";
import useApi from "../hooks/useApi";
jest.mock("../hooks/useApi");
afterAll(() => jest.clearAllMocks());

const singleMockExperience = mockExperiences[0];

describe("ExperienceRow", () => {
  const expectExperienceRowElement = async (text: string, tagName: string) => {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toEqual(tagName);
  };
  test("Renders the mock experience correctly", async () => {
    render(<ExperienceRow data={singleMockExperience} />);
    await expectExperienceRowElement(singleMockExperience.title, "h1");
    await expectExperienceRowElement(singleMockExperience.company, "h2");
    await expectExperienceRowElement(singleMockExperience.summary, "div");
    await expectExperienceRowElement(singleMockExperience.tags[0].value, "li");
  });
});
