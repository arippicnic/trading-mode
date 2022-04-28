import cn from "classnames";
import { AiFillStar } from "react-icons/ai";

import { CurrencyApiType } from "@/types";
import { formartPrice, toFixNumber } from "@/services/general";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { IoReorderTwoOutline } from "react-icons/io5";

interface TypeTableList {
  data: CurrencyApiType;
  widthWindow: number;
  handleAddCrypto: (item: CurrencyApiType) => (e: React.MouseEvent<HTMLElement>) => void;
  activeStar: boolean;
}
const TableList: React.FC<TypeTableList> = ({ data, widthWindow, handleAddCrypto, activeStar }) => {
  const { name, priceUsd, changePercent24Hr, symbol, rank, _no, status } = data;
  const widthTable = widthWindow < 637 ? "hidden" : "";
  const iconStatus =
    status === "DOWN" ? (
      <BsArrowDown className="text-red-500" />
    ) : status === "UP" ? (
      <BsArrowUp className="text-green-500" />
    ) : (
      <IoReorderTwoOutline className="text-gray-400" />
    );

  return (
    <>
      <td className="pl-3 lg:pl-4 py-4 flex item-center">
        <span className="pr-2">
          <button onClick={handleAddCrypto(data)}>
            <AiFillStar className={cn(activeStar ? "text-orange-300" : "text-gray-400", "text-xl")} />
          </button>
        </span>
        <span className={cn("pr-2 lg:pr-3 text-center flex item-center text-gray-400", _no > 9 ? "" : "pl-1")}>{_no}</span>
        <span className="text-gray-600 dark:text-gray-100">
          {name} <span className="text-gray-400">{symbol}</span>
        </span>
      </td>
      <td className={cn("text-right text-gray-600 dark:text-gray-400", widthTable)}>{formartPrice(priceUsd)}</td>
      <td className={cn("text-right text-gray-600 dark:text-gray-400", widthTable)}>{rank}</td>
      <td className="pr-3 lg:pr-4 float-right flex items-center justify-items-center">
        <div className={changePercent24Hr > 0 ? "text-green-500" : "text-red-500"}>{toFixNumber(changePercent24Hr)}%</div>
        <span className="ml-3">{iconStatus}</span>
      </td>
    </>
  );
};

export default TableList;
