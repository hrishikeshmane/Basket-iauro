import React from "react";

type Props = {
  name: string;
  brand: string;
  quantity: string;
  mrp: number;
  productCount: number;
  schedule: Array<{ day: string; sub: boolean }>;
  photo: string;
};

const ProdCard = ({
  name,
  brand,
  quantity,
  mrp,
  productCount,
  schedule,
  photo,
}: Props) => {
  return (
    <div className="relative mx-auto border bg-black rounded-xl shadow-lg">
      <img
        className="mx-auto w-64 h-44 rounded-xl object-cover opacity-50"
        src={photo}
        alt={name}
      />
      <div className="pl-2 w-64 h-40 rounded-xl bg-gradient-to-t from-black absolute bottom-0 space-y-2 sm:text-left">
        <div>
          <p className="text-xl text-white font-semibold">{name}</p>
          <p className="text-white text-xs font-semibold">{brand}</p>
          <p className="text-white text-xs">{quantity}</p>
          <p className="text-white text-xs">MRP: ₹ {mrp}</p>
          <p className="text-white text-xs">Quantity: {productCount}</p>
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

export default ProdCard;
