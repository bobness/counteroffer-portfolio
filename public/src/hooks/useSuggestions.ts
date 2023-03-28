import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Suggestion } from "../types";

interface Props {
  id: number | string | undefined;
  type: string;
}

const baseURL = "http://localhost:8889";

const useSuggestions = ({ id, type }: Props) => {
  const [loading, setLoading] = useState(false);
  const instance = useMemo(
    () =>
      axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
      }),
    []
  );
  const [suggestions, setSuggestions] = useState<Suggestion[] | undefined>();

  useEffect(() => {
    if (id && !suggestions && !loading) {
      if (type === "portfolio") {
        setLoading(true);
        instance
          .get(`/suggestions?userId=${id}`)
          .then((response) => {
            setSuggestions(response.data);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (type === "listing") {
        setLoading(true);
        instance
          .get(`/suggestions?listingId=${id}`)
          .then((response) => {
            setSuggestions(response.data);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [id, type, suggestions, loading]);

  return suggestions;
};

export default useSuggestions;
