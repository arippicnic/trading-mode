import cn from "classnames";
import { BsXLg } from "react-icons/bs";

import { CryptoResults } from "@/types";
import Tooltip, { isToltip } from "@/components/Tooltip";
import { useCryptoContext } from "@/contexts/CryptoContext";
import styles from "@/styles/Main.module.scss";

interface CryptoCardPropType {
  data: CryptoResults;
}

const Header: React.FC<CryptoCardPropType> = ({ data }) => {
  const toltipData = isToltip({ name: "Remove", loop: true });
  const { dispatch } = useCryptoContext();
  return (
    <div className={cn(styles.card, "bg-white dark:bg-[#242425] rounded-md m-2")}>
      <div className="p-3">
        <h2 className="text-lg mb-2">
          {data.symbol}
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
  );
};

export default Header;
