import cn from "classnames";
import { BsGear } from "react-icons/bs";

import Dropdown, { DropdownSubType, DropPositionType } from "@components/Dropdown";
import { timeIntervalData } from "./timeIntervalData";
import { CryptoResults } from "@types";
import { useCryptoContext } from "@contexts/CryptoContext";

interface SettingType extends DropPositionType {
  data: CryptoResults;
  className: string;
}
const Setting: React.FC<SettingType> = ({ data, position, className }) => {
  const { dispatch } = useCryptoContext();
  const arr: DropdownSubType[] = [];
  const len = timeIntervalData.length;

  for (let i = 0; i < len; i++) {
    const timeCrypto = { _id: data._id, val: timeIntervalData[i].time };
    arr.push({
      name: timeIntervalData[i].timeDisplay,
      active: data.time === timeIntervalData[i].time,
      action: () => dispatch!({ type: "CHANGETIME", value: timeCrypto }),
    });
  }

  const dataAction = [
    { name: "Time Frame", subMenu: true, data: arr },
    { name: "Remove", subMenu: false, action: () => dispatch!({ type: "REMOVE", value: data._id }) },
  ];
  return (
    <Dropdown datas={dataAction} position={position}>
      <BsGear className={cn(className, "text-gray-400")} />
    </Dropdown>
  );
};

export default Setting;
