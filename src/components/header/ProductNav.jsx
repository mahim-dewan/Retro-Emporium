"use client";
import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { getAllCategory } from "@/utils/api";

const PRoductNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [categories, setCategories] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const allCategories = async () => {
    const categories = await getAllCategory();
    return categories;
  };

  useEffect(() => {
    const categories = allCategories();
    setCategories(categories);
  }, []);

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
          <div className="absolute top-0 right-0 w-96  box-shadow z-40 bg-white flex flex-wrap gap-0  ">
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home & Decoration
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Tshirt
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Art and Beauty
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Electornics
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home & Decoration
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home & Decoration
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="m-2 whitespace-nowrap hover:text-retro hover:underline active:text-retro active:underline"
            >
              etc
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PRoductNav;
