"use client";
import PriceRange from "@/components/filterItems/PriceRange";
import PaginationBox from "@/components/product/PaginationBox";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByFilter } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SinglecategorySlug = ({ category }) => {
  // Selected price range
  const [priceRange, setPriceRange] = useState({});
  // Fetched products
  const [products, setProducts] = useState([]);
  // Page Number for Pagination
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  console.log(products);

  // Fetch call
  const getProducts = async () => {
    const allProducts = await getProductsByFilter({
      category,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
    setProducts(allProducts);
  };

  useEffect(() => {
    getProducts();
  }, [priceRange]);

  return (
    <div>
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
          <PaginationBox totalPages={products?.totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
};

export default SinglecategorySlug;
