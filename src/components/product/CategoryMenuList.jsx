"use client";
import { getAllCategory } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryMenuList = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories.categories);

  const getAllCategories = async () => {
    const allCategory = await getAllCategory();
    setCategories(allCategory);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 p-2 bg-dark/60 text-white justify-start xl:justify-center">
      {categories.categories?.map((category, i) => {
        if (i < 10) {
          return (
            <Link
              key={category._id}
              href={`/${category.name}`}
              className=" hover:underline font-bold"
            >
              {category.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default CategoryMenuList;
