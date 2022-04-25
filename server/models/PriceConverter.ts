import { Schema, model, Types } from "mongoose";
import { languageType } from "./Language";

export type PriceConverterType = {
  lang_id: languageType["_id"];
  value: number;
  name: string;
  symbol: string;
  converter_symbol: string;
};
export interface PriceConverterTypeExtends extends PriceConverterType, Document {}

const priceConverterSchema = new Schema<PriceConverterType>(
  {
    lang_id: { type: Types.ObjectId, ref: "Language", required: true },
    value: { type: Number, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true, unique: true },
    converter_symbol: { type: String, required: true, unique: true },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

priceConverterSchema.pre("updateOne", function () {
  this.set({ updatedAt: new Date() });
});

export default model<PriceConverterType>("price_converter", priceConverterSchema);
