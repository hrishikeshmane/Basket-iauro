import React from "react";
import { SubCard } from "./SubCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Subs = () => {
  //@ts-ignore
  const subs = useSelector(state => state.subs);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-3 mt-5 h-fit max-w-lg mx-auto border bg-slate-100 rounded-xl shadow-lg ">
      <h2 className="text-center font text-lg font-bold">Your Subscriptions</h2>
      <hr className="w-full m-4" />
      <div>
        {subs.length > 0 ? (
          subs.map((sub: any) => {
            return (
              <SubCard
                name={sub.name}
                brand={sub.brand}
                quantity={sub.quantity}
                mrp={sub.mrp}
                productCount={sub.productCount}
                schedule={sub.schedule}
                photo={sub.photo}
                key={sub.id}
              />
            );
          })
        ) : (
          <h2 className="text-slate-500">No Subscriptions</h2>
        )}
      </div>
      <button
        onClick={() => navigate("products")}
        className="px-4 py-1 my-4 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent"
      >
        Add Subscriptions
      </button>
    </div>
  );
};
