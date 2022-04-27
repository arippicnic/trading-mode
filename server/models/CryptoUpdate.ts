import { Schema, model, Types } from "mongoose";

export type CryptoUpdateTypeStatus = "UP" | "DOWN" | "=";

export type CryptoUpdateType = {
  _no: number;
  id: string;
  status: CryptoUpdateTypeStatus;
  rank: string;
  symbol: string;
  name: string;
  changePercent24Hr: string;
  priceUsd: string;
};

const cryptoUpdategeSchema = new Schema<CryptoUpdateType>({
  _no: { type: Number, required: true },
  id: { type: String, required: true },
  status: { type: String, required: true },
  symbol: { type: String, required: true },
  rank: { type: String, required: true },
  name: { type: String, required: true },
  changePercent24Hr: { type: String },
  priceUsd: { type: String },
});

export default model<CryptoUpdateType>("crypto_update", cryptoUpdategeSchema);
