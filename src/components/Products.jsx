import React, { useState } from "react";
import products from "../products";
import ProdCard from "./ProdCard";
import { useNavigate } from "react-router-dom";

export const Products = ({ subs, setSubs }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState("-Select-");
  const [productCount, setProductCount] = useState(0);
  const [schedule, setSchedule] = useState([
    { day: "mon", sub: false },
    { day: "tue", sub: false },
    { day: "wed", sub: false },
    { day: "thu", sub: false },
    { day: "fri", sub: false },
    { day: "sat", sub: false },
    { day: "sun", sub: false },
  ]);

  const resetStates = () => {
    setProduct("-Select-");
    setProductCount(0);
    setSchedule([
      { day: "mon", sub: false },
      { day: "tue", sub: false },
      { day: "wed", sub: false },
      { day: "thu", sub: false },
      { day: "fri", sub: false },
      { day: "sat", sub: false },
      { day: "sun", sub: false },
    ]);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProductHandler = (e) => {
    e.preventDefault();
    //get seleted product
    let productFilter = products.filter((item) => item.name === product);
    //update selected products list new product with the product count and schedule
    let newselectedProducts = [
      ...selectedProducts,
      { ...productFilter[0], productCount: productCount, schedule: schedule },
    ];
    setSelectedProducts([...newselectedProducts]);
    //reset state
    resetStates();
  };

  const selectHandler = (e) => setProduct(e.target.value);

  const productCountHandler = (e) => setProductCount(e.target.value);

  const daySelectHandler = (day) => {
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
    setSubs(selectedProducts);
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
              onClick={() => addProductHandler(product)}
            >
              {product.name}
            </option>
          ))}
        </select>
        <input
          className="mx-1 w-1/2 p-1 rounded-sm"
          type="number"
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
          selectedProducts.map((product) => {
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
        // disabled
        onClick={subscriptionHandler}
        className="px-4 py-1 my-4 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent"
      >
        Start Subscription
      </button>
    </div>
  );
};
