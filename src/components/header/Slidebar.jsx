"use client";

import React from "react";
import Link from "next/link";
import Button from "../utils/Button";
import { usePathname } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAppContext } from "@/context/AppContext";

const Slidebar = ({ setOpenSlidebar }) => {
  const pathname = usePathname();
  const { openLoginForm, setOpenLoginForm } = useAppContext();
  const { openRegisterForm, setOpenRegisterForm } = useAppContext();

  return (
    <div className="flex flex-col items-start mt-14 relative">
      {/* Slidebar close button  */}
      <AiFillCloseCircle
        onClick={() => setOpenSlidebar(false)}
        className="text-retro text-3xl cursor-pointer font-bold absolute -top-10 left-5"
      />

      {/*  Navigation buttons  */}
      <Link
        href={"/"}
        onClick={() => setOpenSlidebar(false)}
        className={`text-xl font-semibold my-2 m-5 ${
          pathname === "/" && "active-btn"
        }`}
      >
        Home
      </Link>
      <Link
        href={"/products"}
        onClick={() => setOpenSlidebar(false)}
        className={`text-xl font-semibold my-2 m-5 ${
          pathname === "/products" && "active-btn"
        }`}
      >
        Products
      </Link>
      <Link
        href={"/contact"}
        onClick={() => setOpenSlidebar(false)}
        className={`text-xl font-semibold my-2 m-5 ${
          pathname === "/contact" && "active-btn"
        }`}
      >
        Contact
      </Link>

      {/* Login and Register Button  */}
      <div className="flex flex-col items-start">
        <Button
          className="btn-outline"
          handler={() => {
            setOpenSlidebar(false);
            setOpenLoginForm(true);
          }}
        >
          Login
        </Button>
        <Button
          className="btn-fill text-white"
          handler={() => {
            setOpenSlidebar(false);
            setOpenRegisterForm(true);
          }}
        >
          Resister
        </Button>
      </div>
    </div>
  );
};

export default Slidebar;
