import fs from "fs";
import cron from "node-cron";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dataFile from "./_cache/info.json";
const fileName = "./src/pages/api/_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  const msgPrice = "Running a task 3 Hour";
  cron.schedule("* 3 * * *", async () => {
    await cronTask();
  });
  res.status(200).json({ msgPrice });
});

async function cronTask() {
  try {
    const { KEY_CONVERTER } = process.env;
    const URLCONVERTAPI = `https://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=y&apiKey=${KEY_CONVERTER}`;
    const dataConvert = await (await fetch(URLCONVERTAPI)).json();

    const upData = (event: string) => {
      dataFile.price = `${event}`;
      fs.writeFile(fileName, JSON.stringify(dataFile), function writeJSON(err) {
        if (err) return console.log(err);
      });
    };

    upData(dataConvert.USD_IDR?.val);
  } catch (err) {
    return { err };
  }
}

export default handler;
