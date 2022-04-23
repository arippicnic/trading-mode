import { Schema, model } from "mongoose";

export type FearGreadType = {
  value: number;
  classification: string;
};

const fearGreadSchema = new Schema<FearGreadType>(
  {
    value: { type: Number, required: true },
    classification: { type: String, required: true, min: 0, max: 100 },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

fearGreadSchema.pre("updateOne", function () {
  this.set({ updatedAt: new Date() });
});

export default model<FearGreadType>("fear_gread", fearGreadSchema);
