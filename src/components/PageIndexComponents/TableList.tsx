import cn from "classnames";
import { AiFillStar } from "react-icons/ai";

import { CurrencyApiType } from "@/types";
import { formartPrice, toFixNumber } from "@/services/general";

interface TypeTableList {
  data: CurrencyApiType;
  index: number;
  widthWindow: number;
  handleAddCrypto: (item: CurrencyApiType) => (e: React.MouseEvent<HTMLElement>) => void;
  activeStar: boolean;
}
const TableList: React.FC<TypeTableList> = ({ data, index, widthWindow, handleAddCrypto, activeStar }) => {
  const { name, priceUsd, changePercent24Hr, symbol, rank } = data;
  const widthTable = widthWindow < 637 ? "hidden" : "";

  return (
    <>
      <td className="px-5 py-4 flex item-center">
        <span className="pr-2">
          <button onClick={handleAddCrypto(data)}>
            <AiFillStar className={cn(activeStar ? "text-orange-300" : "text-gray-400", "text-xl")} />
          </button>
        </span>
        <span className={cn("pr-3 text-center flex item-center text-gray-400", index > 8 ? "" : "pl-1")}>{index + 1}</span>
        <span>
          {name} <span className="text-gray-400">{symbol}</span>
        </span>
      </td>
      <td className={cn("text-right px-5", widthTable)}>{formartPrice(priceUsd)}</td>
      <td className={cn("text-right px-5", widthTable)}>{rank}</td>
      <td className="px-5 text-right">
        <span className={changePercent24Hr > 0 ? "text-green-500" : "text-red-500"}>{toFixNumber(changePercent24Hr)}%</span>
      </td>
    </>
  );
};

export default TableList;
