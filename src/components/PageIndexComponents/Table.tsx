import cn from "classnames";

import TableList from "./TableList";
import { CryptoActionType, CryptoStateType } from "@/types";
import useToastContext from "@/hooks/useToasts";
import styles from "@/styles/Main.module.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { radomStr } from "@/services/general";
import { fetchSearchQuery } from "@/services/fetchApi";

export interface CurrencyApiType {
  changePercent24Hr: number;
  id: string;
  priceUsd: number;
  name: string;
  symbol: string;
  rank: number;
}
interface TableType {
  currenys: CurrencyApiType[];
  dispatch: React.Dispatch<CryptoActionType>;
  state: CryptoStateType;
}

const Table: React.FC<TableType> = ({ currenys, dispatch, state }) => {
  const addToast = useToastContext();
  const { width } = useWindowDimensions();
  const widthTable = width! < 637 ? "hidden" : "";
  const handleAddCrypto = (item: CurrencyApiType) => (e: React.MouseEvent<HTMLElement>) => {
    const { symbol, name, id, priceUsd } = item;
    if (state.crypto.length === 3) {
      addToast("Max crypto 3");
      return;
    }
    async function fetchAPI() {
      const resultsQuery = await fetchSearchQuery({ query: symbol });
      const _id = radomStr();
      if (!resultsQuery.error) {
        dispatch!({
          type: "ADD",
          value: {
            _id,
            id,
            symbol,
            name,
            priceUsd: Number(priceUsd),
            time: "1",
          },
        });
        return;
      }
      addToast(resultsQuery.error);
    }
    fetchAPI();
  };

  const handleFilterStar = (name: string) => {
    let price = false;
    for (let key of state.crypto) {
      if (name === key.id) {
        price = true;
      }
    }
    return price;
  };

  const { tbl, tbl_th } = styles;
  return (
    <div className="mx-auto px-2">
      <div>
        <div className={cn(tbl, "inline-block min-w-full rounded-lg overflow-hidden")}>
          <table className="min-w-full leading-normal">
            <thead>
              <tr className={cn(tbl_th, "text-left text-xs font-semibold uppercase tracking-wider text-gray-400")}>
                <th className="pl-5 py-4">Name</th>
                <th className={cn("text-right px-5", widthTable)}>Price IDR</th>
                <th className={cn("text-right px-5", widthTable)}>Ranking</th>
                <th className="text-right px-5">24 Hour</th>
              </tr>
            </thead>
            <tbody>
              {currenys.map((data: CurrencyApiType, i, arr) => (
                <tr
                  key={data.id}
                  className={cn(
                    arr.length - 1 === i ? "" : "border-b dark:border-gray-700",
                    "bg-white dark:bg-[#242425] text-sm px-5 py-5"
                  )}
                >
                  <TableList
                    activeStar={handleFilterStar(data.id)}
                    data={data}
                    index={i}
                    widthWindow={width!}
                    handleAddCrypto={handleAddCrypto}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
