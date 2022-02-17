import React from "react";

export const SubCard = ({
  name,
  brand,
  quantity,
  mrp,
  productCount,
  schedule,
  photo
}) => {
  return (
    <div className="p-3 my-4 max-w-md mx-auto border bg-white rounded-xl shadow-lg sm:py-2 sm:flex sm:items-center">
      <img
        className="block mx-auto h-32 w-32 rounded-xl object-cover sm:mx-0 sm:shrink-0"
        src={photo}
        alt={name}
      />
      <div className="ml-3 text-center space-y-2 sm:text-left">
        <div>
          <p className="text-slate-400 text-xs font-semibold">{brand}</p>
          <p className="text-xl text-black font-semibold">{name}</p>
          <p className="text-slate-500 text-xs">{quantity}</p>
          <p className="text-slate-500 text-xs font-medium">
            Quantity: {productCount}
          </p>
          <p className="text-slate-500 text-xs font-medium">MRP: ₹ {mrp}</p>
        </div>
        {schedule.map((day) => {
          return (
            <button
              className={`px-1.5 py-1 mr-1 text-sm font-semibold rounded-full border cursor-default ${
                !day.sub
                  ? "text-purple-600 border-purple-200"
                  : "text-white bg-purple-600 border-transparent"
              } `}
            >
              {day.day[0].toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
