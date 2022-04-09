import cors from "cors";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import fileInfo from "../_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  try {
    const price = req.query.p as string;
    if (!price) res.status(404).json({ error: "Cannot find currency" });
    const URLCOICAP = `https://api.coincap.io/v2/assets?ids=${price}`;
    const dataCoin = await (await fetch(URLCOICAP)).json();
    if (!dataCoin) res.status(404).json({ error: "Cannot find currency" });
    res.send({ price: Number(fileInfo.price.val), coin: dataCoin.data });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
});

export default handler;
