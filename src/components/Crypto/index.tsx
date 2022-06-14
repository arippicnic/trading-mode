import Items from "./Items";
import { CryptoResults } from "@types";
import { StremContextProvider } from "@contexts/StreamContext";
import { UpdatePriceProvider } from "@contexts/UpdatePriceContext";
import { urlSplit } from "@services/general";

interface TradingViewProps {
  data: CryptoResults[];
}

export type FilterCrytoPrice = {
  price: boolean;
} & CryptoResults;

const PageCrypto: React.FC<TradingViewProps> = ({ data }) => {
  const splitUrl = urlSplit(data);
  const ulrSocket = `wss://ws.coincap.io/prices?assets=${splitUrl}`;

  let newState: FilterCrytoPrice[] = [];
  for (let key of data) {
    const objIndex = newState.findIndex((obj) => obj.id === key.id);
    newState = [...newState, { ...key, price: objIndex === -1 ? true : false }];
  }

  return (
    <UpdatePriceProvider data={newState}>
      <StremContextProvider url={ulrSocket}>
        <ul>
          {newState.map((e: FilterCrytoPrice) => (
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
