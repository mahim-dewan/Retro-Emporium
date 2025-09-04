import React from "react";
import Quantity from "./Quantity";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ product }) => {
  return (
    <li className="grid grid-cols-1 md:grid-cols-2 items-start gap-2 shadow p-4 my-2 rounded-lg">
      <div className="flex items-start gap-4 sm:w-3/4 md:w-full">
        <div className="h-32 md:h-42 flex flex-col items-end justify-between">
          <input type="checkbox" className="w-5 h-5" name="" id="" />
          <MdDeleteForever className="text-2xl text-retro cursor-pointer" />
        </div>
        <Image
          alt={product.name}
          src={product.image}
          width={1000}
          height={1000}
          className="w-32 h-32 md:w-42 md:h-42 "
        />
        <Link href={product._id} className="text-md font-bold">
          {product.name}
        </Link>
      </div>

      <div className=" flex items-start justify-center md:justify-around gap-6">
        <div className="flex flex-col items-center justify-center pt-5 md:pt-0">
          <h3 className="text-md font-bold">Unit Price: TK {product?.price}</h3>
          <div className="flex items-center gap-3 my-2">
            <span className="text-sm line-through">TK 1250</span>
            <p className="text-retro font-semibold">33% Off</p>
          </div>
          <h3 className="text-md font-bold">
            Total Price : {Number(product.price) * 1}
          </h3>
        </div>

        <Quantity />
      </div>
    </li> 
  );
};

export default CartItem;
