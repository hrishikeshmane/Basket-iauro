import { createStore } from "redux";
// import { reducer } from "./feature/reducer";

const initialState = { subs: [] };

const reducer = (state: any = initialState, action: any) => {
    if (action.type === "subsUpdate"){
        return { ...state, subs: action.payload }
    }
  return state;
};

export const store = createStore(reducer);
