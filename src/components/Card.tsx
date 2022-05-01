import cn from "classnames";
import { BsXLg } from "react-icons/bs";

import { CryptoResults } from "@/types";
import Tooltip, { isToltip } from "@/components/Tooltip";
import { useCryptoContext } from "@/contexts/CryptoContext";
import styles from "@/styles/Main.module.scss";

interface CryptoCardPropType {
  crypto: CryptoResults[];
}

const Header: React.FC<CryptoCardPropType> = ({ crypto }) => {
  const toltipData = isToltip({ name: "Remove", loop: true });
  const { dispatch } = useCryptoContext();
  return (
    <ul className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {crypto.map((data) => (
        <li key={data._id}>
          <div className={cn(styles.card, "m-2")}>
            <div className="p-3">
              <h2 className="text-lg mb-2">
                <span className="text-gray-600 dark:text-gray-100">{data.symbol}</span>
                <button {...toltipData} className="align-top float-right pt-1">
                  <BsXLg
                    onClick={() => dispatch!({ type: "REMOVE", value: data._id })}
                    className="text-sm sm:text-sm md:text-md lg:text-lg text-red-800"
                  />
                </button>
              </h2>
              <Tooltip id={toltipData["data-for"]} place="top" />
              <p className="text-sm text-gray-400">{data.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Header;
