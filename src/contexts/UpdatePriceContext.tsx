import { createContext, useEffect, useContext, useState } from "react";
import { CryptoResults, CryptoPrice } from "@types";
import { urlSplit } from "@services/general";

type ContextProps = {
  isFirstRealodPrice: CryptoPrice;
};
const UpdatePriceContext = createContext<Partial<ContextProps>>({});

export const useUpdatePriceContext = () => useContext(UpdatePriceContext);
export default UpdatePriceContext;

export const UpdatePriceProvider: React.FC<{ children: React.ReactNode; data: CryptoResults[] }> = ({ children, data }) => {
  const [isFirstRealod, setFirstRealod] = useState<ContextProps | {}>({});
  const splitUrl = urlSplit(data);
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const priceData = await (await fetch(`/api/crypto/price?q=${splitUrl}`)).json();
      if (isSubscribed && priceData) {
        let obj = {};
        for (const ev of priceData.coin) {
          obj = { [ev.id]: ev.priceUsd, ...obj };
        }
        setFirstRealod({ isFirstRealodPrice: obj });
      }
    };
    fetchData();

    return function () {
      isSubscribed = false;
    };
  }, []);

  return <UpdatePriceContext.Provider value={isFirstRealod}>{children}</UpdatePriceContext.Provider>;
};
