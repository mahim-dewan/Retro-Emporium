import React, { useMemo, useState } from "react";
import Quantity from "./Quantity";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { calculateDiscountPersent } from "@/utils/productUtils";
import { updateChecked } from "@/utils/cart";

const CartItem = ({ product, onRemoveCart }) => {
  const [checked, setChecked] = useState(product?.checked);

  const discountPersent = useMemo(
    () => calculateDiscountPersent(product),
    [product]
  );

  const handleChecked = (e) => {
    updateChecked(product);
    setChecked(e.target.checked);
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-2 shadow p-2 my-2 rounded-lg">
      <div className="flex items-start gap-4 sm:w-3/4 md:w-full">
        <div className="h-32 md:h-42 flex flex-col items-end justify-between">
          <input
            type="checkbox"
            className="w-5 h-5"
            name=""
            id=""
            checked={checked}
            onChange={handleChecked}
          />
          <MdDeleteForever
            className="text-2xl text-retro cursor-pointer"
            onClick={() => onRemoveCart(product)}
          />
        </div>
        <div className="flex items-start gap-2">
          <Link href={`/products/${product._id}`}>
            <Image
              alt={product?.title}
              src={product?.images[0]}
              width={1000}
              height={1000}
              className="w-32 h-32  rounded"
            />
          </Link>
          <div className="flex flex-col items-start justify-center md:pt-0">
            <Link href={`/products/${product._id}`}>
              <h2 className="text-md font-bold line-clamp-2 underline">
                {product?.title}
              </h2>
            </Link>
            <h3 className="text-md font-bold flex items-center flex-wrap gap-2">
              <span>TK {product?.discountPrice * 1}</span>
              <span className="text-xs line-through font-normal ">
                TK {product?.regularPrice}
              </span>
            </h3>
            <div className="flex items-center gap-3 my-2">
              <p className="text-retro font-semibold">{discountPersent}% Off</p>
            </div>
            <h3 className="text-md">{product?.status}</h3>
          </div>
        </div>
      </div>
      <Quantity className={"sm:max-w-46"} product={product} />
    </li>
  );
};

export default CartItem;
