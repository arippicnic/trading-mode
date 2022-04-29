import { createContext, useContext } from "react";

export type ContextPropsApp = {
  priceInfo: {
    value: number;
    symbol: string;
  };
};
const AppContext = createContext<Partial<ContextPropsApp>>({});

export const useAppContext = () => useContext(AppContext);
export default AppContext;

export const AppProvider: React.FC<{ children: React.ReactNode; appInfo: ContextPropsApp }> = ({ children, appInfo }) => {
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
