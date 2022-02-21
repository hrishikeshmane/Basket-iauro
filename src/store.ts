import { PayloadAction } from "@reduxjs/toolkit";
import { createStore } from "redux";

type ScheduleType = { day: string; sub: boolean }[];

type ProductType = {
  id: number;
  name: string;
  brand: string;
  quantity: string;
  mrp: number;
  productCount: number;
  schedule: ScheduleType;
  photo: string;
};

type SubsState = {
  subs: ProductType[]
}

const initialState: SubsState = { subs: [] };

const reducer = (state = initialState, action: PayloadAction<ProductType[]>): SubsState => {
    if (action.type === "subsUpdate"){
        return { ...state, subs: action.payload }
    }
  return state;
};

export const store = createStore(reducer);
