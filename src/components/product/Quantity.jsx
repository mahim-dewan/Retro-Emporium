import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import {
  decrementQuantity,
  incrementQuantity,
  inputQuantity,
} from "@/utils/quantity";

const Quantity = ({ className = "", product }) => {
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  // Sync quantity if product quantity changes externally
  useEffect(() => {
    setQuantity(product?.quantity || 1);
  }, [product?.quantity]);

  // Increment Quantity
  const increment = () => {
    incrementQuantity(product);
    setQuantity((prev) => prev + 1);
  };

  // Decrement Quantity
  const decrement = () => {
    if (quantity > 1) {
      decrementQuantity(product);
      setQuantity((prev) => Number(prev - 1));
    }
  };

  // Quantity Input Change
  const handleChange = (e) => {
    const inp = Number(e.target.value);
    setQuantity("");
    if (inp >= 1) {
      setQuantity(inp);
      inputQuantity(product, inp);
    }
  };

  return (
    <div
      className={`box-shadow w-full  m-0 flex items-center gap-1 ${className}`}
    >
      <Button
        className={
          " text-2xl font-bold cursor-pointer px-3 m-0 border border-gray-300 rounded flex-1/3"
        }
        handler={decrement}
      >
        -
      </Button>

      {/* Quantity Input  */}
      <input
        type="number"
        className="  bg-dark/20 w-full px-3 py-1 m-0 rounded text-center font-bold text-xl flex-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={quantity}
        onChange={handleChange}
        min={1}
      />

      <Button
        className={
          " text-2xl font-bold cursor-pointer px-3 m-0 border border-gray-300 rounded flex-1/3 "
        }
        handler={increment}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
