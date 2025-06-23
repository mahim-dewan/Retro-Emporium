"use client";
import Pagination from "@/components/product/PaginationBox";
import ProductCard from "@/components/product/ProductCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);

  const getAllProducts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}api/products?page=${page}`
    );
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getAllProducts();
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-between min-h-[80vh]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 lg:m-2">
        {data?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {/* <Pagination totalPages={data?.totalPages} currentPage={page} /> */}
    </div>
  );
};

export default AllProducts;
