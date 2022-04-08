import fs from "fs";
import path from "path";
import cron from "node-cron";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dataFile from "./_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  const msgPrice = "Running a task 3 Hour";
  const msgFrear = "Running a task 3 Hour";
  cron.schedule("* 3 * * *", async () => {
    await cronPrice();
    await cronFear();
  });
  res.status(200).json({ msgPrice, msgFrear });
});

async function cronPrice() {
  try {
    const { KEY_CONVERTER } = process.env;
    const URLCONVERTAPI = `https://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=y&apiKey=${KEY_CONVERTER}`;
    const dataConvert = await (await fetch(URLCONVERTAPI)).json();

    const upData = (event: string) => {
      const filePath = path.join(process.cwd(), "./src/pages/api/_cache/info.json");
      dataFile.price.val = `${event}`;
      dataFile.price.date = `${new Date()}`;
      fs.writeFile(filePath, JSON.stringify(dataFile), function writeJSON(err) {
        if (err) return console.log(err);
      });
    };

    upData(dataConvert.USD_IDR?.val);
  } catch (err) {
    return { err };
  }
}

async function cronFear() {
  try {
    const URLCONVERTAPI = `https://api.alternative.me/fng`;
    const dataFear = await (await fetch(URLCONVERTAPI)).json();

    const upData = (event: { value: string; value_classification: string }) => {
      const filePath = path.join(process.cwd(), "./src/pages/api/_cache/info.json");
      dataFile.fear.val = `${event.value}`;
      dataFile.fear.value_classification = `${event.value_classification}`;
      dataFile.fear.date = `${new Date()}`;
      fs.writeFile(filePath, JSON.stringify(dataFile), function writeJSON(err) {
        if (err) return console.log(err);
      });
    };

    upData(dataFear.data[0]);
  } catch (err) {
    return { err };
  }
}

export default handler;
