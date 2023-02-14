import axios from "axios";
import { useMemo } from "react";
import { Message } from "../types";

// const baseUrl = "http://localhost:5000";

const useApi = () => {
  const instance = useMemo(
    () =>
      axios.create({
        // baseURL: baseUrl,
        headers: { "Content-Type": "application/json" },
      }),
    []
  );

  const getPortfolio = (username: string) =>
    instance.get("/portfolios/" + username);

  const getQuestions = (username: string) =>
    instance.get("/surveys/" + username);

  const postResponses = (username: string, responses: Message[]) =>
    instance.post("/surveys/" + username, responses);

  return {
    getPortfolio,
    getQuestions,
    postResponses,
  };
};

export default useApi;
