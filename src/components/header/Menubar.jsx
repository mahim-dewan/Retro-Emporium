// "use client";
import React from "react";
import Button from "../utils/Button";
import { useAuthModalsContext } from "@/context/authModalsContext";
import { signOut, useSession } from "next-auth/react";
import ProductNav from "./ProductNav";
import { ProfileDropDown } from "./ProfileDropDown";
import Image from "next/image";

const Menubar = () => {
  const { setOpenLoginForm, setOpenRegisterForm } = useAuthModalsContext();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="flex items-center justify-end">
      {/* Products Menu  */}
      <ProductNav />
      {/* Login and Register Button */}
      {user ? (
        <ProfileDropDown>
          <div className="w-8 h-8 md:w-10 md:h-10  p-0 rounded-full overflow-hidden mt-1 border border-retro cursor-pointer">
            <Image
              src={
                "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg"
              }
              alt="Profile"
              className="w-full h-full "
              width={44}
              height={44}
            />
          </div>
        </ProfileDropDown>
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
