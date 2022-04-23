import express, { Request, Response } from "express";

import Crypto from "../models/Crypto";
import FearGread from "../models/FearGread";
import { OK, BAD_REQUEST, INTERNAL, NOT_FOUND } from "../services/responses";
import { searchSchema } from "../validate";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (searchSchema({ query })) return BAD_REQUEST(res, searchSchema({ query }));

    const found = await Crypto.findOne({ symbol: `${query.toUpperCase()}USDT` }).exec();
    if (!found) return NOT_FOUND(res, "Can not find currency");
    return OK(res, found);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

router.get("/fear_gread", async (req: Request, res: Response) => {
  try {
    const found = await FearGread.find().exec();
    return OK(res, found[0]);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

export default router;
