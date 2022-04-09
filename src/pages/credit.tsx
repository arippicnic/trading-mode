import type { NextPage } from "next";
import Link from "@/components/Link";
import Button from "@/components/Button";

const Credit: NextPage = () => {
  const links = [
    { label: "Chart", href: "https://tradingview.com" },
    { label: "RESTful API & WebSocket", href: "https://coincap.io" },
    { label: "RESTful API Currency Converter", href: "https://free.currencyconverterapi.com" },
    { label: "RESTful API Crypto Fear & Greed Index", href: "https://alternative.me" },
  ].map(({ label, href }: { label: string; href: string }) => {
    return (
      <li className="pb-2">
        {label}
        <br />
        <Link href={href}>
          <span className="text-blue-600">{href.replace("https://", "")}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className="main-content">
      <div className="text-center">
        <h1 className="text-xl text-center">Credits</h1>
        <div className="pt-5">
          <ul>{links}</ul>
        </div>
        <div className="pt-5">
          <Link href="/">
            <Button className="text-xs">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Credit;
