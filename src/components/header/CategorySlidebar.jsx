"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/features/api/apiSlice";

const CategorySlidebar = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Sheet>
      <SheetTrigger>
        <IoIosArrowDown
          aria-label="Open categories"
          className="text-3xl text-retro cursor-pointer m-2 -mr-3"
        />
      </SheetTrigger>

      <SheetContent side="top" className={"bg-white max-h-5/6 overflow-y-auto"}>
        <SheetHeader>
          <SheetTitle>All Categories</SheetTitle>
          {categories?.length === 0 ? (
            <p>No categories available.</p>
          ) : (
            <ul className="grid grid-cols-2 flex-wrap gap-3">
              {categories?.map((category) => (
                <li key={category._id} className="m-2 hover:text-retro">
                  <SheetClose asChild>
                    <Link href={`/${category.name}`}>{category.name}</Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySlidebar;
