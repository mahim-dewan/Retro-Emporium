"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../utils/Button";
import { useAppContext } from "@/context/AppContext";
import { signOut, useSession } from "next-auth/react";

const Menubar = () => {
  const pathname = usePathname();
  const {
    openLoginForm,
    setOpenLoginForm,
    openRegisterForm,
    setOpenRegisterForm,
  } = useAppContext();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="flex items-center">
      <Link
        href={"/"}
        className={`text-xl font-semibold my-5 mx-2 ${
          pathname === "/" && "active-btn"
        }`}
      >
        Home
      </Link>
      <Link
        href={"/products"}
        className={`text-xl font-semibold my-5 mx-2 ${
          pathname === "/products" && "active-btn"
        }`}
      >
        Products
      </Link>
      <Link
        href={"/contact"}
        className={`text-xl font-semibold my-5 mx-2 ${
          pathname === "/contact" && "active-btn"
        }`}
      >
        Contact
      </Link>

      {/* Login and Register Button */}
      {user ? (
        <Button
          handler={() => signOut({ redirect: false })}
          className={"btn-fill"}
        >
          Sign Out
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            handler={() => setOpenLoginForm(true)}
            className="btn-outline"
          >
            Login
          </Button>
          <Button
            handler={() => setOpenRegisterForm(true)}
            className="btn-fill text-white"
          >
            Resister
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menubar;
