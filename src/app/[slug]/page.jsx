"use client";
import PriceRange from "@/components/filterItems/PriceRange";
import PaginationBox from "@/components/product/PaginationBox";
import ProductCard from "@/components/product/ProductCard";
import { useFilteredProductsQuery } from "@/features/api/apiSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SinglecategorySlug = ({ params }) => {
  const { slug: category } = params;
  // Selected price range
  const [priceRange, setPriceRange] = useState({});
  // Page Number for Pagination
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  // Get Price Range
  const minPrice = searchParams.get("min Price");
  const maxPrice = searchParams.get("max Price");
  // RTK Query hook call
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useFilteredProductsQuery({
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });

  useEffect(() => {
    setPriceRange({
      min: parseInt(minPrice),
      max: parseInt(maxPrice) || Infinity,
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Categories Menu  */}
      <div className="flex flex-col md:flex-row">
        {/* Price Range  */}
        <PriceRange category={category} setPriceRange={setPriceRange} />

        {/* Filtered Products  */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:m-2 gap-2 justify-around ">
            {products?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
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
