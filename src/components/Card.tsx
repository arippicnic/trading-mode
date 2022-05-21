import React from "react";
import cn from "classnames";

import Setting from "./Trade/Setting";
import { CryptoResults } from "@types";
import useDeviceSize from "@hooks/useDeviceSize";
import styles from "@styles/Main.module.scss";

interface CryptoCardPropType {
  crypto: CryptoResults[];
}

const Header: React.FC<CryptoCardPropType> = ({ crypto }) => {
  const { width } = useDeviceSize();
  const widthZise = width! < 925 ? "Left" : "Right";

  return (
    <ul className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {crypto.map((data) => (
        <li key={data._id}>
          <div className={cn(styles.card, "m-2")}>
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg">
                  <span className="text-gray-600 dark:text-gray-100">{data.symbol}</span>
                </h2>
                <Setting data={data} position={widthZise} className="text-sm sm:text-sm md:text-md lg:text-lg" />
              </div>
              <p className="text-sm text-gray-400">{data.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Header;
