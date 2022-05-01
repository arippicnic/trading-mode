import express, { Request, Response } from "express";

import Crypto from "../models/Crypto";
import FearGread from "../models/FearGread";
import CryptoUpdate from "../models/CryptoUpdate";
import { OK, BAD_REQUEST, INTERNAL, NOT_FOUND } from "../services/responses";
import { querySchema } from "../validate";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (querySchema({ query })) return BAD_REQUEST(res, querySchema({ query }));

    const found = await Crypto.findOne({ symbol: `${query.toUpperCase()}USDT` }).exec();
    if (!found) return NOT_FOUND(res, "Couldn't find currency");
    return OK(res, found);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});
router.get("/cryptos", async (req: Request, res: Response) => {
  try {
    const found = await CryptoUpdate.find().exec();
    return OK(res, found);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (querySchema({ query })) return BAD_REQUEST(res, querySchema({ query }));

    const URLCOICAP = `https://api.coincap.io/v2/assets?search=${query.toLowerCase()}&limit=5`;
    const found = await (await fetch(URLCOICAP)).json();
    if (!found) return NOT_FOUND(res, "Couldn't find currency");
    return OK(res, found.data);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

router.get("/price", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (querySchema({ query })) return BAD_REQUEST(res, querySchema({ query }));

    const URLCOICAP = `https://api.coincap.io/v2/assets?ids=${query}`;
    const found = await (await fetch(URLCOICAP)).json();
    if (!found) return NOT_FOUND(res, "Couldn't find currency");
    return OK(res, { coin: found.data });
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
