import { useCryptoContext } from "@contexts/CryptoContext";
import Card from "@components/Card";
import Link from "@components/Link";
import Button from "@components/Button";
import TimeInterval from "./TimeInterval";

const PageTrade: React.FC = () => {
  const { state, dispatch } = useCryptoContext();
  const { crypto, loading } = state;

  const RenderContent = () => {
    if (loading) {
      return <p className="text-center mt-5">Loading...</p>;
    }
    return (
      <>
        <Card crypto={crypto} />
        <div className="flex flex-col items-center">
          <TimeInterval state={state} dispatch={dispatch} />
          <Link href="/crypto">
            <Button disabled={crypto.length == 0 ? true : false}>Trade</Button>
          </Link>
        </div>
      </>
    );
  };
  return <RenderContent />;
};

export default PageTrade;
