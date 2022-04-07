import Tooltip, { isToltip } from "@/components/Tooltip";
import { perc2color } from "@/services/general";

export interface FearType {
  fication: string;
  value: number;
}

const FearGreadIndex: React.FC<FearType> = ({ fication, value }) => {
  const toltipDatas = isToltip({ name: "Fear and Greed Index", loop: false });
  const color = perc2color(value);
  return (
    <>
      <div {...toltipDatas} className="pt-5 text-gray-500 dark:text-gray-400 text-center">
        <p>{fication}</p>
        <div className="text-sm sm:text-sm md:text-md lg:text:lg bg-black rounded-md p-1 mt-1">
          <p style={{ color }}>{value}</p>
        </div>
      </div>
      <Tooltip id={toltipDatas["data-for"]} place="bottom" />
    </>
  );
};

export default FearGreadIndex;
