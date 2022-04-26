import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import { CryptoResults } from "@/types";
import { SrenMode } from "./scren";

const Items: React.FC<{ data: CryptoResults; scren: SrenMode }> = ({ data, scren }) => {
  const { symbol, time, _id } = data;
  const isRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const srciptData = `new TradingView.widget({
      "autosize": true,
      "symbol": "${`BINANCE:${symbol}USDT`}",
      "interval": "${time}",
      "timezone": "Asia/Jakarta",
      "theme": "${theme}",
      "style": "1",
      "locale": "id",
      "hide_top_toolbar": true,
      "enable_publishing": false,
      "allow_symbol_change": true,
      "save_image": false,
      "hide_legend": true,
      "container_id": "${`tradingview_view_${_id}`}"
  });`;
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = srciptData;
    if (!isRef.current) {
      return;
    }
    isRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={isRef}>
      <div className={scren} id={`tradingview_view_${_id}`}></div>
    </div>
  );
};

export default Items;
