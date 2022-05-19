import { IntervalTime } from "@types";

interface TimeProps {
  time: IntervalTime;
  timeDisplay: string;
}

export const timeIntervalData: TimeProps[] = [
  {
    time: "1",
    timeDisplay: "1m",
  },
  {
    time: "5",
    timeDisplay: "5m",
  },
  {
    time: "60",
    timeDisplay: "1h",
  },
  {
    time: "D",
    timeDisplay: "1d",
  },
  {
    time: "W",
    timeDisplay: "1w",
  },
];
