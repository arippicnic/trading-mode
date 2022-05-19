import { useEffect, useState } from "react";

import Card from "@components/Card";
import Table from "./Table";
import { useCryptoContext } from "@contexts/CryptoContext";
import { CurrencyApiType } from "@types";
import { fetchCurrency } from "@services/fetchApi";

const PageIndex: React.FC = () => {
  const [currency, setcurrency] = useState<CurrencyApiType[] | null>(null);
  const { state, dispatch } = useCryptoContext();
  const { crypto, loading } = state;

  useEffect(() => {
    async function fetchAPIcurrency() {
      const result = await fetchCurrency();
      setcurrency(result);
    }
    fetchAPIcurrency();
  }, []);

  const RenderContent = () => {
    if (loading || !currency) {
      return <p className="text-center mt-5">Loading...</p>;
    }
    return (
      <>
        <Card crypto={crypto} />
        <Table currenys={currency!} dispatch={dispatch!} state={state} />
      </>
    );
  };
  return <RenderContent />;
};

export default PageIndex;
