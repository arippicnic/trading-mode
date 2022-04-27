import cron from "node-cron";
import async from "async";

import PriceConverter from "../models/PriceConverter";
import CryptoUpdate, { CryptoUpdateType, CryptoUpdateTypeStatus } from "../models/CryptoUpdate";
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
  cron.schedule("0 */5 * * * *", async () => {
    cronFear().then(() => console.log("success update crypto"));
  });

  //test
  // cron.schedule("0 */1 * * * *", () => {
  //   console.log("1 minute");
  // });
};

async function cronCrypto() {
  const fethData = await (await fetch(`https://api.coincap.io/v2/assets?limit=300`)).json();
  if (!fethData) return;
  const result = fethData.data
    .sort((a: { changePercent24Hr: number }, b: { changePercent24Hr: number }) => b.changePercent24Hr - a.changePercent24Hr)
    .slice(0, 20);
  let nomor = 0;
  const foundCurrency = await CryptoUpdate.find().exec();
  let stausData: CryptoUpdateTypeStatus = "UP";
  async.eachSeries(
    result,
    function updateObject(obj: CryptoUpdateType, done) {
      nomor = nomor + 1;

      if (foundCurrency.length !== 0) {
        const x = foundCurrency.filter((x) => x.id === obj.id);
        stausData = x.length === 0 ? "UP" : x[0]._no === nomor ? "=" : x[0]._no > nomor ? "UP" : "DOWN";
        CryptoUpdate.deleteOne({ _no: nomor }, function (err) {
          if (err) return err;
        });
      }

      const data: CryptoUpdateType = { ...obj, _no: nomor, status: stausData };
      CryptoUpdate.create(data, done);
    },
    function allDone(err) {
      console.log(err);
    }
  );
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
