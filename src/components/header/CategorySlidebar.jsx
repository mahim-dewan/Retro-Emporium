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
import { getAllCategory } from "@/utils/api";
import Link from "next/link";

const CategorySlidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const allCategory = await getAllCategory();
        setCategories(allCategory);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCategories();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="bg-none">
        <IoIosArrowDown className="text-3xl text-retro cursor-pointer m-2 -mr-3" />
      </SheetTrigger>
      <SheetContent side="top" className={"bg-white"}>
        <SheetHeader>
          <SheetTitle>All Categories</SheetTitle>
          <ul className="grid grid-cols-2 flex-wrap  ga-3">
            {categories?.map((category) => (
              <li className="m-2 hover:text-retro">
                <SheetClose asChild>
                  <Link href={`/${category.name}`}>{category.name}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySlidebar;
