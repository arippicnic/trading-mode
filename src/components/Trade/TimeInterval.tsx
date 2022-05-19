import cn from "classnames";

import { timeIntervalData } from "./timeIntervalData";
import { CryptoContextType } from "@types";

const TimeInterval: React.FC<CryptoContextType> = ({ state, dispatch }) => {
  const timeState = state.crypto[0]?.time;

  return (
    <div className="pb-5 flex">
      {timeIntervalData.map(({ time, timeDisplay }) => (
        <button
          key={time}
          className={cn(
            time === timeState ? "bg-[#8882] text-blue-300" : "text-gray-400 hover:bg-[#8882] hover:text-blue-300",
            "px-3 py-2 mx-1 rounded-md text-sm"
          )}
          onClick={() => dispatch!({ type: "CHANGETIME", value: time })}
        >
          {timeDisplay}
        </button>
      ))}
    </div>
  );
};

export default TimeInterval;
