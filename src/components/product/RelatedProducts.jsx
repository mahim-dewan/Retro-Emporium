import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useFilteredProductsQuery } from "@/features/api/apiSlice";

const RelatedProducts = ({ product }) => {
  const { data } = useFilteredProductsQuery({
    category: product?.category,
  });

  return (
    <div className=" my-10">
      <div className="flex items-center justify-center p-2">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <h2 className="title text-lg px-2 min-w-42">Related Products</h2>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 lg:m-2">
        {data?.products?.map((p) => {
          if (p._id !== product._id) {
            return <ProductCard product={p} />;
          }
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
