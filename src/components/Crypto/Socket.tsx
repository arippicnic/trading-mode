import { useState, useEffect } from "react";

import { formartPrice, priceStrem } from "@services/general";
import { CryptoResults } from "@types";
import { useStremContext } from "@contexts/StreamContext";
import { useUpdatePriceContext } from "@contexts/UpdatePriceContext";
import { useAppContext } from "@contexts/AppContext";

const TredingSocket: React.FC<{ data: CryptoResults }> = ({ data }) => {
  const [isPrice, setPrice] = useState(0);
  const [isFirst, setFirst] = useState(true);
  const { isFirstRealodPrice } = useUpdatePriceContext();
  const { priceInfo } = useAppContext();
  const { isStrem } = useStremContext();

  useEffect(() => {
    if (isFirst && isFirstRealodPrice) {
      const firtPrice = priceStrem(isFirstRealodPrice, data);
      if (firtPrice !== 0) {
        setPrice(firtPrice);
      }
      setFirst(false);
    }
  }, [isFirstRealodPrice]);

  useEffect(() => {
    const price = priceStrem(isStrem!, data);
    if (price !== 0) {
      setPrice(price);
    }
  }, [isStrem]);
  return <span>{formartPrice(isPrice * priceInfo!.value)}</span>;
};
export default TredingSocket;
