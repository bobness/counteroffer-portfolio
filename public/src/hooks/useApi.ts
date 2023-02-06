import axios from "axios";
import { useMemo } from "react";

// const baseUrl = "https://inspect.datagotchi.net";
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

  return {
    getPortfolio,
    getQuestions,
  };
};

export default useApi;
