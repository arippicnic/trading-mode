import cn from "classnames";
import { useEffect, useState } from "react";

import Setting from "@components/Trade/Setting";
import Chart from "./Chart";
import TradingSocket from "./Socket";
import { SrenMode } from "./scren";
import { FilterCrytoPrice } from "./index";
import styles from "@styles/Main.module.scss";

const Items: React.FC<{ data: FilterCrytoPrice; lenght: number }> = ({ data, lenght }) => {
  const [isContent, setContent] = useState(false);
  const scren: SrenMode = lenght === 1 ? "h-[100vh]" : lenght === 2 ? "h-[50vh]" : "h-[33.333vh]";
  const { trv, trv_price, trv_closed } = styles;

  useEffect(() => {
    setTimeout(() => {
      setContent(true);
    }, 7000);
  }, [isContent, setContent]);

  return (
    <div className={cn(trv, scren, "dark:bg-[#131722]")}>
      <Chart data={data} scren={scren} />
      {data.price && (
        <div className={trv_price}>
          <div className="text-white border border-wa-500 text-xs sm:text-xs md:text-sm lg:text-sm bg-black rounded-full p-1 px-3">
            <div className="flex">
              <span className="mr-2">{data.symbol}IDR</span>
              <TradingSocket data={data} />
            </div>
          </div>
        </div>
      )}
      {isContent && (
        <div className={trv_closed}>
          <div className="bg-white dark:bg-[#131722] pl-12 pt-1 pr-7">
            <Setting data={data} position="Left" className="text-md" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
