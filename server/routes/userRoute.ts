import express, { Request, Response } from "express";

import { OK, INTERNAL } from "../services/responses";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    return OK(res, {});
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

export default router;
