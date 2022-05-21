export type IntervalTime = "1" | "5" | "60" | "D" | "W";

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
};

export type CryptoResults = {
  _id: string;
  time?: IntervalTime;
} & Crypto;

export type CryptoStateType = {
  crypto: CryptoResults[];
  loading?: boolean;
  pair: number;
};

export type CurrencyApiType = {
  changePercent24Hr: number;
  rank: number;
  _no: number;
  status: string;
} & Crypto;

export type CryptoPrice = {
  [key: string]: string;
};

export type CryptoTimeType = {
  _id: CryptoResults["_id"];
  val: IntervalTime;
};
export type CryptoActionType =
  | { type: "STORAGE"; value: CryptoStateType }
  | { type: "ADD"; value: CryptoResults }
  | { type: "REMOVE"; value: string }
  | { type: "CHANGETIME"; value: CryptoTimeType }
  | { type: "CHANGETIMEALL"; value: IntervalTime };

export type CryptoContextType = {
  state: CryptoStateType;
  dispatch?: React.Dispatch<CryptoActionType>;
};
