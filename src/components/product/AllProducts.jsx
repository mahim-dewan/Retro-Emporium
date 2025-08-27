import { allProducts } from "@/lib/api";
import React from "react";
import ProductCard from "./ProductCard";
import PaginationBox from "./PaginationBox";

const AllProducts = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1; // Get page for pagination
  const { products, totalPages } = await allProducts({ page }); // Get Products by pagination

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:m-2 gap-2 justify-around ">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <PaginationBox totalPages={totalPages} />
    </div>
  );
};

export default AllProducts;
