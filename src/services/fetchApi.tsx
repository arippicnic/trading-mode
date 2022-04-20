import { isApiError } from "./general";

export const fetchSearch = async ({ query }: { query: string }) => {
  try {
    const data = query ? await (await fetch(`/api/search/query?q=${query}`)).json() : [];
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
