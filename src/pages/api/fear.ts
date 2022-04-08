import cors from "cors";
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import fileInfo from "./_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  try {
    res.status(200).json(fileInfo.fear);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
});

export default handler;
