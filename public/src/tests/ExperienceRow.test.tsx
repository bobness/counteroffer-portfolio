import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ExperienceRow from "../components/ExperienceRow";

import { mockExperiences } from "../hooks/__mocks__/axios";

const singleMockExperience = mockExperiences[0];

describe("ExperienceRow", () => {
  const expectExperienceRowElement = async (text: string, tagName: string) => {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toEqual(tagName);
  };
  test("Renders the mock experience correctly", async () => {
    render(<ExperienceRow data={singleMockExperience} />);
    await expectExperienceRowElement(singleMockExperience.title, "h3");
    await expectExperienceRowElement(singleMockExperience.company, "h4");
    await expectExperienceRowElement(singleMockExperience.summary, "div");
    await expectExperienceRowElement(singleMockExperience.tags[0].value, "li");
  });
});
