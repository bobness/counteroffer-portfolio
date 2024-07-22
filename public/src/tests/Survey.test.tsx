import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Survey from "../components/Survey";

import { mockQuestions } from "../hooks/__mocks__/axios";

import axios from "axios";
jest.mock("axios");

const mockUsername = "test username";

describe("Survey", () => {
  test("Renders header", async () => {
    render(<Survey username={mockUsername} />);
    const headerElement = await screen.findByText("Contact Candidate");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName.toLowerCase()).toEqual("div");
  });

  test("Renders mock questions", async () => {
    render(<Survey username={mockUsername} />);
    const questionsHeader = await screen.findByText("Survey Questions");
    expect(questionsHeader).toBeInTheDocument();
    expect(questionsHeader.tagName.toLowerCase()).toEqual("div");
    mockQuestions.forEach(async (mq) => {
      const element = await screen.findByText(mq.question);
      expect(element).toBeInTheDocument();
    });
  });

  xtest("Does not allow submission until required questions are answered", () => {
    // TODO
  });
});
