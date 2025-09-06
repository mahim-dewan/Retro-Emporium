"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import PriceRange from "@/components/filterItems/PriceRange";
import PaginationBox from "@/components/product/PaginationBox";
import ProductCard from "@/components/product/ProductCard";
import {
  useFilteredProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "@/features/api/apiSlice";

const SinglecategorySlug = ({ params }) => {
  const { slug: category } = params;

  // Search Params
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");

  /// Price Range State
  const [priceRange, setPriceRange] = useState({
    value: "",
    min: min_price ? parseInt(min_price, 10) : 0,
    max: max_price ? parseInt(max_price, 10) : Infinity,
  });

  // Sync priceRange if query params change
  useEffect(() => {
    setPriceRange({
      min: parseInt(min_price),
      max: parseInt(max_price) || Infinity,
    });
  }, [min_price, max_price]);

  // API Query
  const { data: categoryData } = useGetCategoriesQuery(category);
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useFilteredProductsQuery({
    category_id: categoryData?._id,
    min_price,
    max_price,
    page,
  });

  return (
    <div className="min-h-screen">
      {/* Categories Menu  */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filter */}
        <PriceRange category={category} setPriceRange={setPriceRange} />

        {/* Filtered Products  */}
        <div className="w-full relative">
          {isLoading && (
            <p className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Loading products...
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {error?.data?.message || "Failed to load products"}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:m-2 gap-2 justify-around ">
            {products?.products?.length > 0
              ? products.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              : !isLoading &&
                isSuccess && (
                  <p className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    No products found
                  </p>
                )}
          </div>

          {/* Pagination box  */}
          {products?.totalPages >= 1 && (
            <PaginationBox
              totalPages={products?.totalPages}
              currentPage={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglecategorySlug;
