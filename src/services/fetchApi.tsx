import useSWR from "swr";

import { isApiError } from "./general";

export const fetchSearch = ({ query }: { query: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(query ? `/api/search?q=${query}` : null, fetcher);
  return data;
};

export const fetchSearchQuery = async ({ query }: { query: string }) => {
  try {
    const data = await (await fetch(`/api/search?s=${query}`)).json();
    return data;
  } catch (err) {
    if (isApiError(err)) {
      console.log(err.code);
      return {
        error: err.code,
      };
    }
  }
};
