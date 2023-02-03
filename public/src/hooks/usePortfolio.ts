import { useEffect, useState } from "react";
import { Experience, Fact, Portfolio } from "../types";
import useApi from "./useApi";

interface Props {
  user_id: number;
}

const usePortfolio = ({ user_id }: Props) => {
  const [portfolio, setPortfolio] = useState<Portfolio | undefined>();

  const api = useApi();

  useEffect(() => {
    api.getPortfolio(user_id).then((response) => {
      setPortfolio(response.data);
    });
  }, []);

  return portfolio;
};

export default usePortfolio;
