import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const joiObjectId = Joi.string()
  .trim()
  .min(1)
  .custom((value, helpers: any) => {
    try {
      return isValidObjectId(value) ? value : helpers.message("ID must conform to an ObjectId");
    } catch (err) {
      return helpers.message("ID must conform to an ObjectId");
    }
  });
