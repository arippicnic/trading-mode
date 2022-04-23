import { Schema, model, Types } from "mongoose";
import { ExchangeType } from "./Exchange";

export type CryptoType = {
  symbol: string;
  exchage: ExchangeType["_id"][];
};

const cryptogeSchema = new Schema<CryptoType>({
  symbol: { type: String, required: true, unique: true },
  exchage: [{ type: Types.ObjectId, ref: "Exchange", required: true }],
});

export default model<CryptoType>("crypto", cryptogeSchema);
