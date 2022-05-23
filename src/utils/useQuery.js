import { useLocation } from "react-router-dom";

export const useQuery = (query) => {
  return new URLSearchParams(useLocation().search).get(query);
};
