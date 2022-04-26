import { useEffect, useState } from "react";
import cn from "classnames";

import { CryptoResults } from "@/types";
import TradingSocket from "./Socket";
import { SrenMode } from "./scren";
import Chart from "./Chart";
import styles from "@/styles/Main.module.scss";

const Items: React.FC<{ data: CryptoResults; lenght: number }> = ({ data, lenght }) => {
  const [isContent, setContent] = useState(false);
  const scren: SrenMode = lenght === 1 ? "h-[100vh]" : lenght === 2 ? "h-[50vh]" : "h-[33.333vh]";
  const { trv, trv_price, trv_closed } = styles;

  const RenderContent = () => {
    if (isContent) {
      return (
        <>
          <div className={trv_price}>
            <div className="text-white border border-wa-500 text-xs sm:text-xs md:text-sm lg:text-sm bg-black rounded-full p-1 px-3">
              <div className="flex">
                <span className="mr-2">{data.symbol}IDR</span>
                <TradingSocket data={data} />
              </div>
            </div>
          </div>
          <div className={trv_closed}>
            <div className="bg-white dark:bg-[#131722] p-3 pl-10"></div>
          </div>
        </>
      );
    }
    return <main></main>;
  };
  useEffect(() => {
    setTimeout(() => {
      setContent(true);
    }, 3000);
  }, [isContent, setContent]);
  return (
    <div className={cn(trv, scren, "dark:bg-[#131722]")}>
      <Chart data={data} scren={scren} />
      <RenderContent />
    </div>
  );
};

export default Items;
