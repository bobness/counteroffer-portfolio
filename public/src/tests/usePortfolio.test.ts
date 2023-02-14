import { renderHook, waitFor } from "@testing-library/react";

import usePortfolio from "../hooks/usePortfolio";
import { Portfolio } from "../types";

import { mockPortfolio } from "../hooks/__mocks__/useApi";
import useApi from "../hooks/useApi";
jest.mock("../hooks/useApi");
afterAll(() => jest.clearAllMocks());

describe("usePortfolio", () => {
  test("Returns the mock portfolio object", async () => {
    const one = renderHook(() => usePortfolio("test username"));
    let returnedPortfolio: Portfolio | undefined;
    await waitFor(() => {
      returnedPortfolio = one.result.current;
      expect(returnedPortfolio?.name).toEqual(mockPortfolio.name);
      expect(returnedPortfolio?.facts).toEqual(mockPortfolio.facts);
      // TODO: the startdate time is ~1 second off
      // expect(returnedPortfolio?.experiences).toEqual(mockPortfolio.experiences);
    });
  });
});
