import PriceRange from "@/components/filterItems/PriceRange";
import AllProducts from "@/components/product/AllProducts";
import React from "react";

const Products = () => {
  return (
    <div className=" min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Price Range  */}
        <PriceRange />
        {/* category={category} setPriceRange={setPriceRange} */}
        <AllProducts />
      </div>
    </div>
  );
};

export default Products;
