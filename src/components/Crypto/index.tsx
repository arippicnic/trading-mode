import Items from "./Items";
import { CryptoResults } from "@types";
import { StremContextProvider } from "@contexts/StreamContext";
import { UpdatePriceProvider } from "@contexts/UpdatePriceContext";
import { urlSplit } from "@services/general";

interface TradingViewProps {
  data: CryptoResults[];
}
const PageCrypto: React.FC<TradingViewProps> = ({ data }) => {
  const splitUrl = urlSplit(data);
  const ulrSocket = `wss://ws.coincap.io/prices?assets=${splitUrl}`;
  return (
    <UpdatePriceProvider data={data}>
      <StremContextProvider url={ulrSocket}>
        <ul>
          {data.map((e) => (
            <li key={e._id}>
              <Items data={e} lenght={data.length} />
            </li>
          ))}
        </ul>
      </StremContextProvider>
    </UpdatePriceProvider>
  );
};

export default PageCrypto;
