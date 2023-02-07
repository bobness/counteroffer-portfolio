import axios from "axios";
import { useMemo } from "react";
import { Message } from "../types";

// const baseUrl = "https://counteroffer.datagotchi.net";
const baseUrl = "http://localhost:5000";

const useApi = () => {
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: baseUrl,
        headers: { "Content-Type": "application/json" },
      }),
    []
  );

  const getPortfolio = (user_id: number) =>
    instance.get("/portfolios/" + user_id);

  const getQuestions = (user_id: number) => instance.get("/surveys/" + user_id);

  const postResponses = (user_id: number, responses: Message[]) =>
    instance.post("/surveys/" + user_id, responses);

  return {
    getPortfolio,
    getQuestions,
    postResponses,
  };
};

export default useApi;
