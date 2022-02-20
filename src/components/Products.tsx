import React, { useState } from "react";
import products from "../products";
import ProdCard from "./ProdCard";
import { useNavigate } from "react-router-dom";

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

type Props = {
  subs: ProductType[];
  setSubs: Function;
};

const defaultSchedule = [
  { day: "mon", sub: false },
  { day: "tue", sub: false },
  { day: "wed", sub: false },
  { day: "thu", sub: false },
  { day: "fri", sub: false },
  { day: "sat", sub: false },
  { day: "sun", sub: false },
];

export const Products = ({ subs, setSubs }: Props) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState("-Select-");
  const [productCount, setProductCount] = useState(0);
  const [schedule, setSchedule] = useState(defaultSchedule);

  const resetStates = () => {
    setProduct("-Select-");
    setProductCount(0);
    setSchedule(defaultSchedule);
  };

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const addProductHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //validation
    if (productCount === 0 || product === "-Select-") {
      alert("product selected and/or quantity invalid");
      return;
    }
    if (schedule === defaultSchedule) {
      alert("please select a schedule");
      return;
    }

    //get seleted product
    let productFilter = products.filter(item => item.name === product);
    //update selected products list new product with the product count and schedule
    let newselectedProducts: ProductType[] = [
      ...selectedProducts,
      { ...productFilter[0], productCount: productCount, schedule: schedule },
    ];
    
    setSelectedProducts(newselectedProducts);
    //reset state
    resetStates();
  };

  const selectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => setProduct(e.currentTarget.value);

  const productCountHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProductCount(parseInt(e.target.value));

  const daySelectHandler = (day: String) => {
    let newDays = schedule.map((item) => {
      if (item.day === day) {
        return { ...item, sub: !item.sub };
      } else {
        return item;
      }
    });
    setSchedule(newDays);
  };

  const subscriptionHandler = () => {
    //set Subscriptions
    setSubs([...subs, ...selectedProducts]);
    //reset to empty list
    setSelectedProducts([]);
    //navigate back to "/"
    navigate("/");
  };

  return (
    <div className="p-6 mt-5 h-fit max-w-xl mx-auto border bg-slate-100 rounded-xl shadow-lg space-y-2 flex flex-col items-center">
      <h2 className="text-center font text-lg font-bold">Products</h2>
      <hr className="w-full m-4" />

      <form className="flex" onSubmit={addProductHandler}>
        <select
          className="mx-1 w-1/2 p-1 rounded-sm"
          value={product}
          onChange={selectHandler}
        >
          <option>-Select-</option>
          {products.map((product) => (
            <option
              key={product.id}
              value={product.name}
            >
              {product.name}
            </option>
          ))}
        </select>
        <input
          className="mx-1 w-1/2 p-1 rounded-sm"
          type="number"
          min="0"
          placeholder="enter quantity"
          value={productCount}
          onChange={productCountHandler}
        />
        <input
          className="mx-1 bg-purple-600 text-white rounded-full px-4 cursor-pointer"
          type="submit"
          value="Add"
        />
      </form>

      <div>
        {schedule.map((day) => {
          return (
            <button
              onClick={() => daySelectHandler(day.day)}
              className={`px-1.5 py-1 mx-1 text-sm font-semibold rounded-full border ${
                !day.sub
                  ? "text-purple-600 border-purple-200 hover:text-white hover:bg-purple-300 hover:border-transparent"
                  : "text-white bg-purple-600 border-transparent  hover:text-white hover:border-purple-500 hover:bg-purple-800"
              } `}
            >
              {day.day[0].toUpperCase()}
            </button>
          );
        })}
      </div>

      <hr className="w-full m-4" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {
          //selected products list
          selectedProducts.map((product: ProductType) => {
            return (
              <ProdCard
                name={product.name}
                brand={product.brand}
                quantity={product.quantity}
                mrp={product.mrp}
                productCount={product.productCount}
                schedule={product.schedule}
                photo={product.photo}
                key={product.id}
              />
            );
          })
        }
      </div>
      <button
        className={`px-4 py-1 my-4 text-sm font-semibold rounded-full border ${
          selectedProducts.length > 0
            ? "text-purple-600  border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent"
            : "text-slate-400 border-slate-300"
        } `}
        disabled={selectedProducts.length > 0 ? false : true}
        onClick={subscriptionHandler}
      >
        Start Subscription
      </button>
    </div>
  );
};
