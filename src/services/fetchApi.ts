import { isApiError } from "./general";
import { siteMeta } from "@services/siteMeta";

export const fetchCurrency = async () => {
  try {
    const data = await (await fetch(`${siteMeta.siteUrl}/api/crypto/cryptos`)).json();
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

export const fetchSearch = async ({ query }: { query: string }) => {
  try {
    const data = query ? await (await fetch(`/api/crypto/search?q=${query}`)).json() : [];
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
    const data = await (await fetch(`/api/crypto?q=${query}`)).json();
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
