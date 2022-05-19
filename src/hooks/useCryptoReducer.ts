import { CryptoStateType, CryptoActionType } from "@types";
import { newPrice } from "@services/general";

export const initialState = {
  crypto: [],
  loading: true,
  pair: 0,
};

export const actionCryptoReducer = (state: CryptoStateType, action: CryptoActionType) => {
  switch (action.type) {
    case "STORAGE":
      return {
        ...state,
        crypto: action.value.crypto,
        loading: false,
      };
    case "ADD":
      if (!action.value) {
        return state;
      }
      if (state.crypto.length === 3) {
        return state;
      }
      if (state.crypto.length > 0) {
        return {
          ...state,
          crypto: [...state.crypto, action.value].map((obj) => ({ ...obj, time: state.crypto[0].time })),
        };
      }
      return {
        ...state,
        crypto: [...state.crypto, action.value],
      };
    case "REMOVE":
      return {
        ...state,
        crypto: state.crypto.filter((t) => t._id !== action.value),
      };
    case "CHANGETIME":
      return {
        ...state,
        crypto: state.crypto.map((obj) => ({ ...obj, time: action.value })),
      };
    case "CHANGEPRICE":
      return {
        ...state,
        crypto: newPrice(action.value.coin, state.crypto),
        pair: action.value.pair,
      };
    default:
      return state;
  }
};
