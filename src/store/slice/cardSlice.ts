import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardPaylod } from "../../interfaces/service/card";

interface CardState {
  requestCardPayload: CardPaylod;
}

const initialState: CardState = {
  requestCardPayload: {
    fromAccountNumber: "",
    cardType: "",
    deliveryOption: "",
    pickupBranch: "",
    address: "",
    city: "",
    zipCode: "",
  },
};

export const cardSlice = createSlice({
  name: "card",
  initialState,

  reducers: {
    setRequestCard: (state, action) => {
      state.requestCardPayload = {
        ...state.requestCardPayload,
        ...action.payload,
      };
    },
  },
});

export const { setRequestCard } = cardSlice.actions;

export const selectCard = (state: RootState) => state.card;
export default cardSlice.reducer;
