import { useState, useEffect } from "react";

import { formartPrice, priceStrem } from "@/services/general";
import { CryptoResults } from "@/types";
import { useStremContext } from "@/contexts/StreamContext";
import { useUpdatePriceContext } from "@/contexts/UpdatePriceContext";

const TredingSocket: React.FC<{ data: CryptoResults }> = ({ data }) => {
  const { isFirstRealodPair, isFirstRealodPrice } = useUpdatePriceContext();
  const [isPrice, setPrice] = useState(0);
  const [isFirst, setFirst] = useState(true);
  const { isStrem } = useStremContext();
  const pair = isFirstRealodPair ? isFirstRealodPair : 0;

  useEffect(() => {
    if (isFirst && isFirstRealodPrice) {
      const firtPrice = priceStrem(isFirstRealodPrice, data);
      if (firtPrice !== 0) {
        setPrice(firtPrice);
      }
      setFirst(false);
    }
  }, [isFirstRealodPair]);

  useEffect(() => {
    const price = priceStrem(isStrem!, data);
    if (price !== 0) {
      setPrice(price);
    }
  }, [isStrem]);
  return <span>{formartPrice(isPrice * pair)}</span>;
};
export default TredingSocket;
