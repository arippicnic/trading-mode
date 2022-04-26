import express, { Request, Response } from "express";

import { OK, BAD_REQUEST, INTERNAL, NOT_FOUND } from "../services/responses";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const found = { name: "picnic", des: "picnic sekali" };
    return OK(res, found);
  } catch (err) {
    console.log(err);
    return INTERNAL(res);
  }
});

export default router;
