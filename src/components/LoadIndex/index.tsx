import { useCryptoContext } from "@/contexts/CryptoContext";
import Card from "@/components/Card";
import Link from "@/components/Link";
import Button from "@/components/Button";
import Search from "./Search";
import TimeInterval from "./TimeInterval";

const LoadIndex: React.FC = () => {
  const { state, dispatch } = useCryptoContext();
  const { crypto, loading } = state;

  const RenderContent = () => {
    if (loading) {
      return <p className="text-center">Loading ...</p>;
    }
    return (
      <>
        <Search />
        <ul className="py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {crypto.map((data) => (
            <li key={data._id}>
              <Card data={data} />
            </li>
          ))}
        </ul>
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

export default LoadIndex;
