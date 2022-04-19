import { useCryptoContext } from "@/contexts/CryptoContext";
import Card from "@/components/Card";
import Table, { CurrencyApiType } from "@/components/PageIndexComponents/Table";

const PageIndex: React.FC<{ currenys: CurrencyApiType[] }> = ({ currenys }) => {
  const { state, dispatch } = useCryptoContext();
  const { crypto, loading } = state;

  const RenderContent = () => {
    if (loading) {
      return <p className="text-center">Loading ...</p>;
    }
    return (
      <>
        <Card crypto={crypto} />
        <Table currenys={currenys} dispatch={dispatch!} state={state} />
      </>
    );
  };
  return <RenderContent />;
};

export default PageIndex;
