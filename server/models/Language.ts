import { Schema, model, Document } from "mongoose";

export type languageTypeObject = {
  name: string;
  symbol: "ID" | "EN";
};
export interface languageType extends languageTypeObject, Document {}

const LanguageSchema = new Schema<languageType>({
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true },
});

export default model<languageType>("language", LanguageSchema);
