// "use client";
import React from "react";
import Button from "../utils/Button";
import { useAppContext } from "@/context/AppContext";
import { signOut, useSession } from "next-auth/react";
import ProductNav from "./ProductNav";
import { ProfileDropDown } from "./ProfileDropDown";

const Menubar = () => {
  const { setOpenLoginForm, setOpenRegisterForm } = useAppContext();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="flex items-center justify-end">
      {/* Products Menu  */}
      <ProductNav />
      {/* Login and Register Button */}
      {user ? (
        <ProfileDropDown />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            handler={() => setOpenLoginForm(true)}
            className="btn-outline-gradient"
          >
            Login
          </Button>
          <Button
            handler={() => setOpenRegisterForm(true)}
            className="btn-fill-gradient text-white"
          >
            Resister
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menubar;
