import React from "react";
import Button from "../utils/Button";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[170px] sm:w-[190px] bg-pastel-olive h-[280px] mx-auto my-2 p-2 rounded-lg text-dark relative">
      <Link href={`/products/${product._id}`} className="hover:underline">
        <Image
          src={product?.images[0]}
          className="w-full h-[150px] rounded object-cover"
          alt={product?.name}
          width={400}
          height={300}
          unoptimized
        />
        <h2 className="text-sm line-clamp-3">{product?.title}</h2>
      </Link>
      <div className="flex justify-between items-center my-2 absolute bottom-0 w-[90%]">
        <div>
          <p className="font-semibold">{product?.discountPrice} TK</p>
          <p className="text-gray-700 line-through">${product?.regularPrice} TK</p>
        </div>
        <Button className={"btn-fill text-sm p-2 m-0 text-white"}>
          <TiShoppingCart className="text-2xl" aria-label="Add to cart" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
