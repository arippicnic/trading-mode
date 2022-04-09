import cors from "cors";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) res.status(404).json({ error: "Cannot find currency" });
    const URLCOICAP = `https://api.coincap.io/v2/assets?search=${query.toLowerCase()}&limit=5`;
    const data = await (await fetch(URLCOICAP)).json();
    if (!data) res.status(404).json({ error: "Cannot find currency" });
    res.send(data.data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
});

export default handler;
