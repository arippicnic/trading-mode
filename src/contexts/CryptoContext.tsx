import { createContext, useContext, useReducer } from "react";

import { CryptoContextType } from "@types";
import { useCryptoStore } from "@hooks/useCryptoStore";
import { initialState, actionCryptoReducer } from "@hooks/useCryptoReducer";

const CryptoContext = createContext<CryptoContextType>({ state: initialState });
export const useCryptoContext = () => useContext(CryptoContext);

export const CryptoWrapper = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useCryptoStore(useReducer(actionCryptoReducer, initialState));

  return <CryptoContext.Provider value={contextValue}>{children}</CryptoContext.Provider>;
};
