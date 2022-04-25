import cron from "node-cron";
import async from "async";

import PriceConverter from "../models/PriceConverter";
import FearGread, { FearGreadType } from "../models/FearGread";

type CryptoPrice = {
  [key: string]: { val: number };
};

export default () => {
  // cronTest();
  // cronFear();
  // cronPrice();
  // cron.schedule("0 0 */3 * * *", async () => {
  //   cronPrice().then(() => console.log("success send email"));
  // });
  // cron.schedule("0 0 */5 * * *", async () => {
  //   cronFear().then(() => console.log("success send email"));
  // });
  //test
  cron.schedule("0 */1 * * * *", () => {
    cronTest();
    console.log("1 minute");
  });
  // cron.schedule("*/15 * * * * *", () => {
  //   // cronTest();
  //   console.log("15");
  // });
};

async function cronTest() {
  console.log("test work");
  await FearGread.updateOne({ $set: { value: 23 } });
}

async function cronPrice() {
  const found = await PriceConverter.find().exec();
  let url = "";
  for (var index = 0; index < found.length; index++) {
    const com = index === 0 ? "" : ",";
    url = `${found[index].converter_symbol}${com}${url}`;
  }
  const { KEY_CONVERTER } = process.env;
  const URLCONVERTAPI = `https://free.currencyconverterapi.com/api/v5/convert?q=${url}&compact=y&apiKey=${KEY_CONVERTER}`;
  const dataConvert: CryptoPrice = await (await fetch(URLCONVERTAPI)).json();
  if (Object.keys(dataConvert).length === 0) return;

  async.eachSeries(
    found,
    function updateObject(obj, done) {
      PriceConverter.updateOne({ _id: obj._id }, { $set: { value: dataConvert[obj.converter_symbol].val } }, done);
    },
    function allDone(err) {
      console.log(err);
    }
  );
}

async function cronFear() {
  const URLCONVERTAPI = `https://api.alternative.me/fng`;
  const dataFear = await (await fetch(URLCONVERTAPI)).json();
  if (!dataFear) return;
  const dataUpdate: FearGreadType = { value: dataFear.data[0].value, classification: dataFear.data[0].value_classification };
  await FearGread.updateOne({ $set: dataUpdate });
}
