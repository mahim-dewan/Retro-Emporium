"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetCategoriesQuery } from "@/features/api/apiSlice";

const PRoductNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [arrow, setArrow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: subCategories } = useGetCategoriesQuery();

  return (
    <nav
      onMouseEnter={() => {
        setIsOpen(true);
        setArrow(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setArrow(false);
      }}
    >
      <div className="relative">
        <Link
          href={"/products"}
          onClick={() => {
            router.push("/products");
          }}
          className={` font-semibold cursor-pointer mx-2 hover:text-retro active:text-retro flex items-center ${
            pathname === "/products" ? "active-btn" : ""
          }`}
        >
          Products
          {arrow ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </Link>
        {isOpen && (
          <div className="absolute top-0 right-0 w-[600px] max-h-96 overflow-y-auto  box-shadow z-40 bg-white flex flex-wrap gap-0  ">
            {subCategories?.map((subCategory) => (
              <Link
                href={"/"}
                className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
              >
                {subCategory.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default PRoductNav;
