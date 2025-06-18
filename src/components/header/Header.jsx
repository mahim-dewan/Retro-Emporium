"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/Retro-logo.png";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import Menubar from "./Menubar";
import Slidebar from "./Slidebar";

const Header = () => {
  const [openSlidebar, setOpenSlidebar] = useState(false);

  return (
    <header className="border-b border-dark w-full h-16 flex justify-between items-center pr-5">
      {/* logo */}
      <Link href={"/"}>
        <Image alt="logo" src={logo} width={150} />
      </Link>

      {/* Humburger  */}
      <div className="md:hidden">
        <TiThMenu
          onClick={() => setOpenSlidebar(!openSlidebar)}
          className="text-retro text-3xl cursor-pointer"
        />
      </div>

      {/* Menubar */}
      <div className="hidden md:block">
        <Menubar />
      </div>

      {/* Slidebar */}
      <div
        className={`min-h-full md:hidden z-50 bg-white border-l border-retro fixed top-0 w-1/2 right-0 transition-all duration-300 ease-in-out ${
          !openSlidebar ? "translate-x-96" : "translate-x-0"
        } `}
      >
        <Slidebar
          openSlidebar={openSlidebar}
          setOpenSlidebar={setOpenSlidebar}
        />
      </div>
    </header>
  );
};

export default Header;
