import { CryptoResults, CryptoPrice } from "@/types";

interface ApiError {
  code: number;
  error: string;
}

export const isApiError = (x: any): x is ApiError => {
  return typeof x.code === "number";
};

export const formartPrice = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const radomStr = () => {
  const random = (Math.random() + 1).toString(36).substring(5);
  return random;
};

export const urlSplit = (data: CryptoResults[]) => {
  let url = "";
  for (var index = 0; index < data.length; index++) {
    const com = index === 0 ? "" : ",";
    url = `${data[index].id}${com}${url}`;
  }
  return url;
};

export const newPrice = (action: CryptoPrice, data: CryptoResults[]) => {
  let newState = data;
  for (let key in action) {
    const objIndex = newState.findIndex((obj) => obj.id == key);
    newState[objIndex].priceUsd = Number(action[key]);
    newState[objIndex];
  }
  return newState;
};

export const priceStrem = (strem: CryptoPrice, data: CryptoResults) => {
  let price = 0;
  for (let key in strem) {
    if (data.id === key) {
      price = Number(strem[key]);
    }
  }
  return price;
};

export const perc2color = (perc: number) => {
  var r,
    g,
    b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return "#" + ("000000" + h.toString(16)).slice(-6);
};
