"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/Retro-logo.png";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import Menubar from "./Menubar";
import Slidebar from "./Slidebar";
import SearchBar from "./SearchBar";
import { Badge } from "../ui/badge";
import { GiShoppingCart } from "react-icons/gi";
import CategorySlidebar from "./CategorySlidebar";
import { CiSquarePlus } from "react-icons/ci";
import { useSession } from "next-auth/react";

const Header = () => {
  const [openSlidebar, setOpenSlidebar] = useState(false);
  const { data: user } = useSession();

  return (
    <header className="sticky md:top-0 -top-16 z-40 border-b  bg-white border-gray-300 min-w-full">
      <div className=" flex justify-between items-center pr-5">
        {/* Left: Logo + Search (md+) */}
        <div className="flex items-center justify-around md:flex-1">
          {/* logo */}
          <Link href={"/"}>
            <Image alt="logo" src={logo} width={150} />
          </Link>

          {/* Search bar (desktop only) */}
          <div className=" hidden md:block w-full">
            <SearchBar />
          </div>
        </div>

        {/* Right: Cart, Menu, Menubar */}
        <div className="flex items-center">
          {/* Category Menu Slider (Mobile Only) */}
          <div className=" md:hidden">
            <CategorySlidebar />
          </div>

          {user?.user?.role === "admin" && (
            <Link
              href={"/admin/dashboard/create-product"}
              className="hidden md:block ml-8 -mr-2"
            >
              <CiSquarePlus className="text-3xl  cursor-pointer" />
            </Link>
          )}

          {/* Shopping Cart  */}
          <Link href={"/cart"} className="relative mx-4">
            <GiShoppingCart className="text-3xl text-retro cursor-pointer m-2" />
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-pastel-olive text-retro absolute bottom-7 right-0">
              8
            </Badge>
          </Link>

          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <TiThMenu
              onClick={() => setOpenSlidebar(!openSlidebar)}
              className="text-retro text-3xl cursor-pointer"
            />
          </div>

          {/* Menubar (desktop only) */}
          <div className="hidden md:block w-4/5 ">
            <Menubar />
          </div>
        </div>
      </div>

      {/* Sidebar (mobile only) */}
      <div
        className={`min-h-full md:hidden z-50 bg-white border-l border-retro fixed top-0 w-1/2 right-0 transition-all duration-300 ease-in-out ${
          !openSlidebar ? "translate-x-96" : "translate-x-0"
        } `}
      >
        <Slidebar setOpenSlidebar={setOpenSlidebar} />
      </div>

      {/* Search bar (mobile only) */}
      <div className="md:hidden w-4/5 mx-auto">
        <SearchBar />
      </div>
      {/* Bottom's Menu (mobile only ) */}
    </header>
  );
};

export default Header;
