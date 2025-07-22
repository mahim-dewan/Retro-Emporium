"use client";

import React from "react";
import Link from "next/link";
import Button from "../utils/Button";
import { usePathname, useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuthModalsContext } from "@/context/authModalsContext";
import { signOut, useSession } from "next-auth/react";

const Slidebar = ({ setOpenSlidebar }) => {
  const pathname = usePathname();
  const { setOpenRegisterForm, setOpenLoginForm } = useAuthModalsContext();
  const { data: user } = useSession();
  const router = useRouter();

  // Log out handler
  const handleLogOut = async () => {
    await signOut({ redirect: false });
    setOpenSlidebar(false);
    router.replace("/");
    router.refresh();
  };

  return (
    <div>
      <div className="flex flex-col min-h-full items-start mt-14 relative">
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
      </div>
      {/* Login and Register Button  */}
      {user?.user ? (
        <Button
          handler={handleLogOut}
          className={
            "absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-md text-center font-semibold hover:shadow-sm shadow-dark p-2 w-[90%] rounded-lg"
          }
        >
          Sign Out
        </Button>
      ) : (
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
      )}
    </div>
  );
};

export default Slidebar;
