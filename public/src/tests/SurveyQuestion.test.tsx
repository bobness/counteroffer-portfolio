import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SurveyQuestion from "../components/SurveyQuestion";

import { mockQuestions } from "../hooks/__mocks__/axios";
import axios from "axios";
jest.mock("axios");
afterAll(() => jest.clearAllMocks());

describe("SurveyQuestion", () => {
  xtest("TODO", () => {});
});
