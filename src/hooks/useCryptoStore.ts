import { useMemo, useEffect } from "react";

import { CryptoStateType, CryptoActionType } from "@types";
import { initialState } from "./useCryptoReducer";
import { siteMeta } from "@siteMeta";

export function useCryptoStore([state, dispatch]: [CryptoStateType, React.Dispatch<CryptoActionType>]) {
  const keyLocal = siteMeta.localStorage.userInfo;

  useEffect(() => {
    const local = localStorage.getItem(keyLocal);
    const localJSON = local ? JSON.parse(local) : null;
    if (localJSON) {
      dispatch({ type: "STORAGE", value: localJSON });
    } else {
      dispatch({ type: "STORAGE", value: state });
      localStorage.setItem(keyLocal, JSON.stringify(state));
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(keyLocal, JSON.stringify(state));
    }
  }, [state, dispatch]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return contextValue;
}
