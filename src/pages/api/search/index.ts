import cors from "cors";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import fileCrypto from "../_cache/crypto.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  try {
    const search = req.query.s as string;
    if (!search) res.status(400).json({ error: "Cannot find currency" });
    const querySearch = search.toUpperCase() + "USDT";
    const found = fileCrypto.crypto.find(({ symbol }: { symbol: string; price: string }) => symbol === querySearch);
    if (!found) res.status(400).json({ error: "Cannot find currency" });
    console.log(found);
    res.status(200).send(found);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
});

export default handler;
