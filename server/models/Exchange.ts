import { Schema, model, Document } from "mongoose";

export type ExchangeTypeObject = {
  name: string;
  symbol: "BC";
  tradingview_symbol: string;
};
export interface ExchangeType extends ExchangeTypeObject, Document {}

const exchangeSchema = new Schema<ExchangeType>({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  tradingview_symbol: { type: String, required: true, unique: true },
});

export default model<ExchangeType>("exchange", exchangeSchema);
