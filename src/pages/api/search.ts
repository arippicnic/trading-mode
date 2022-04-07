import cors from "cors";
import { readFile } from "fs/promises";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const fileCrypto = "./src/pages/api/_cache/crypto.json";
const fileInfo = "./src/pages/api/_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  const query = req.query.q as string;
  const search = req.query.s as string;
  const price = req.query.p as string;
  if (query) {
    try {
      const URLCOICAP = `https://api.coincap.io/v2/assets?search=${query.toLowerCase()}&limit=5`;
      const data = await (await fetch(URLCOICAP)).json();
      res.send(data?.data);
    } catch (err) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
  if (search) {
    try {
      const obj = await JSON.parse(await readFile(fileCrypto, "utf8"));
      const querySearch = search.toUpperCase() + "USDT";
      const found: object = obj.crypto.find(({ symbol }: { symbol: string; price: string }) => symbol === querySearch);
      if (found) {
        res.status(200).send(found);
      }
      res.status(400).json({ error: "Cannot find currency on Binance" });
    } catch (err) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
  if (price) {
    try {
      const URLCOICAP = `https://api.coincap.io/v2/assets?ids=${price}`;
      const dataCoin = await (await fetch(URLCOICAP)).json();
      const obj = await JSON.parse(await readFile(fileInfo, "utf8"));
      if (dataCoin) {
        res.send({
          price: Number(obj.price),
          coin: dataCoin.data,
        });
      }
      res.status(500).json({ error: "failed to load data" });
    } catch (err) {
      res.status(500).json({ error: "failed to load data" });
    }
  }
  res.send({});
});

export default handler;
