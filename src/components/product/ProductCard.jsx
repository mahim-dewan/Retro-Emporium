import React from "react";
import Button from "../utils/Button";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[170px] sm:w-[190px] bg-pastel-olive h-[280px] mx-auto my-2 p-2 rounded-lg text-dark relative">
      <Link href={`products/${product._id}`} className="hover:underline">
        <img
          src={product?.image}
          className="w-full h-[150px] rounded"
          alt={product?.name}
        />
        <h2 className="text-sm line-clamp-3">{product?.name}</h2>
      </Link>
      <div className="flex justify-between items-center my-2 absolute bottom-0 w-[90%]">
        <p className="font-semibold">${product?.price}</p>
        <Button className={"btn-fill text-sm p-2 m-0 text-white"}>
          <TiShoppingCart className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
