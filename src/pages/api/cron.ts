import fs from "fs";
import path from "path";
import cron from "node-cron";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dataFile from "./_cache/info.json";

const handler = nc<NextApiRequest, NextApiResponse>().use(cors());

handler.get(async (req, res) => {
  const cron1 = cron;
  const cron2 = cron;

  cron1.schedule("0 0 */3 * * *", async () => {
    const price = await cronPrice();
    console.log(price);
  });
  cron2.schedule("0 0 */5 * * *", async () => {
    const fear = await cronFear();
    console.log(fear);
  });

  const fear = await cronFear();
  const price = await cronPrice();
  const msgPrice = { info: "Price Running a task 3 Hour", data: price };
  const msgFrear = { info: "Fear Running a task 5 Hour", data: fear };
  res.status(200).json([msgFrear, msgPrice]);
});

async function cronPrice() {
  try {
    const { KEY_CONVERTER } = process.env;
    const URLCONVERTAPI = `https://free.currencyconverterapi.com/api/v5/convert?q=USD_IDR&compact=y&apiKey=${KEY_CONVERTER}`;
    const dataConvert = await (await fetch(URLCONVERTAPI)).json();
    if (!dataConvert.USD_IDR) return console.log(dataConvert);
    const filePath = path.resolve(process.cwd(), "./src/pages/api/_cache/info.json");

    dataFile.price.val = `${dataConvert.USD_IDR.val}`;
    dataFile.price.date = `${new Date()}`;
    fs.writeFile(filePath, JSON.stringify(dataFile, null, 4), (err) => {
      if (err) return console.log(err);
    });
    return dataFile.price;
  } catch (err) {
    return { err };
  }
}

async function cronFear() {
  try {
    const URLCONVERTAPI = `https://api.alternative.me/fng`;
    const dataFear = await (await fetch(URLCONVERTAPI)).json();
    if (!dataFear) return console.log(dataFear);

    const filePath = path.resolve(process.cwd(), "./src/pages/api/_cache/info.json");
    dataFile.fear.val = `${dataFear.data[0].value}`;
    dataFile.fear.value_classification = `${dataFear.data[0].value_classification}`;
    dataFile.fear.date = `${new Date()}`;
    fs.writeFile(filePath, JSON.stringify(dataFile, null, 4), (err) => {
      if (err) return console.log(err);
    });
    return dataFile.fear;
  } catch (err) {
    return { err };
  }
}

export default handler;
