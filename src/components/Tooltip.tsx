import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

type Props = {
  id: string;
  place?: "top" | "right" | "bottom" | "left";
};
export const isToltip = ({ name, loop }: { name: string; loop: boolean }) => {
  const toltipName = name.toLowerCase().replace(/ /g, "_");
  if (loop) {
    const random = (Math.random() + 1).toString(36).substring(7);
    const toltipData = { "data-tip": name, "data-for": `${toltipName}_${random}` };
    return toltipData;
  }
  const toltipData = { "data-tip": name, "data-for": `${toltipName}` };
  return toltipData;
};

const Tooltip: React.FC<Props> = ({ id, place }) => {
  const { theme } = useTheme();
  let bgToltip = "";
  let colorToltip = "";
  if (theme === "dark") {
    bgToltip = "#fff";
    colorToltip = "#222427";
  }
  return <ReactTooltip place={place} id={id} textColor={colorToltip} backgroundColor={bgToltip} delayShow={250} />;
};
export default Tooltip;
