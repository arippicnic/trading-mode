import type { NextPage } from "next";
import cn from "classnames";

import Link from "@components/Link";
import styles from "@styles/Main.module.scss";

const Credit: NextPage = () => {
  const links = [
    { label: "Chart", href: "https://tradingview.com" },
    { label: "RESTful API & WebSocket", href: "https://coincap.io" },
    { label: "RESTful API Currency Converter", href: "https://free.currencyconverterapi.com" },
    { label: "RESTful API Crypto Fear & Greed Index", href: "https://alternative.me" },
  ].map(({ label, href }: { label: string; href: string }) => {
    return (
      <li className={cn(styles.card, "flex flex-col mb-3 py-2 bg-white dark:bg-[#242425] rounded-md")} key={href}>
        <span>{label}</span>
        <Link href={href}>
          <span className="text-blue-600">{href.replace("https://", "")}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className="main-content px-2 text-center">
      <ul>{links}</ul>
    </div>
  );
};

export default Credit;
