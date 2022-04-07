import cors from "cors";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  try {
    const data = await (await fetch("https://api.alternative.me/fng")).json();
    res.send(data?.data[0]);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
});

export default handler;
