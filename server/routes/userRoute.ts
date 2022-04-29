import express, { Request, Response } from "express";

import { OK, INTERNAL } from "../services/responses";
import PriceConverter from "../models/PriceConverter";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const foundCurrency = await PriceConverter.findOne({ symbol: "IDR" }).exec();
    const result = { priceInfo: foundCurrency };
    return OK(res, result);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

export default router;
