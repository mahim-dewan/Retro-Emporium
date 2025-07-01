import React from "react";
import Button from "../utils/Button";

const Quantity = () => {
  return (
    <div className="box-shadow max-w-46 md:m-0 flex-1">
      <input
        type="text"
        name=""
        id=""
        placeholder="quantity"
        className="  bg-dark/20 w-full px-3 py-2 m-0 rounded text-center font-bold text-xl"
        value={"1"}
      />
      <div className="p-2 flex items-center justify-around gap-3">
        <Button className={" text-2xl font-bold cursor-pointer px-3 py-2 m-0"}>
          -
        </Button>
        <Button className={" text-2xl font-bold cursor-pointer px-3 py-2 m-0"}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
