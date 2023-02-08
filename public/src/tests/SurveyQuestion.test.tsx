import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SurveyQuestion from "../components/SurveyQuestion";

import { mockQuestions } from "../hooks/__mocks__/useApi";
import useApi from "../hooks/useApi";
jest.mock("../hooks/useApi");
afterAll(() => jest.clearAllMocks());

describe("SurveyQuestion", () => {
  xtest("TODO", () => {});
});
