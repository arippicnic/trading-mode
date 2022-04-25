import cron from "node-cron";
import async from "async";

import PriceConverter from "../models/PriceConverter";
import FearGread, { FearGreadType } from "../models/FearGread";

type CryptoPrice = {
  [key: string]: { val: number };
};

export default () => {
  cron.schedule("0 0 */3 * * *", async () => {
    cronPrice().then(() => console.log("success update price"));
  });
  cron.schedule("0 0 */5 * * *", async () => {
    cronFear().then(() => console.log("success update fear"));
  });

  //test
  // cron.schedule("0 */1 * * * *", () => {
  //   cronTest();
  //   console.log("1 minute");
  // });
};

async function cronTest() {
  console.log("test work");
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
