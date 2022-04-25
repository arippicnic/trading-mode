import Joi from "joi";
import { joiObjectId } from "./joiSchema";

export const querySchema = ({ query }: { query: string }) =>
  Joi.object({
    query: Joi.string().required(),
  }).validate({ query }).error?.details[0].message;
