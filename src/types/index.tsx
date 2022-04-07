export type IntervalTime = "1" | "5" | "60" | "D" | "W";

export interface CryptoResults {
  _id: string;
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  time?: IntervalTime;
}

export interface CryptoStateType {
  crypto: CryptoResults[];
  loading?: boolean;
  pair: number;
}

export interface CryptoPrice {
  [key: string]: string;
}

export type CryptoActionType =
  | { type: "STORAGE"; value: CryptoStateType }
  | { type: "ADD"; value: CryptoResults }
  | { type: "REMOVE"; value: string }
  | { type: "CHANGETIME"; value: IntervalTime }
  | { type: "CHANGEPRICE"; value: { coin: CryptoPrice; pair: number } };

export interface CryptoContextType {
  state: CryptoStateType;
  dispatch?: React.Dispatch<CryptoActionType>;
}
