import Image from "next/image";
import React from "react";
import { IoHome } from "react-icons/io5";
import { ProfileDropDown } from "./ProfileDropDown";
import { GiShoppingCart } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import Button from "../utils/Button";
import { PiUserListFill } from "react-icons/pi";

const BottomNav = () => {
  return (
    <div className="bg-white text-dark border-t border-pastel-olive p-2">
      <div className="flex items-end justify-around">
        <Button className={"flex flex-col items-center text-sm"}>
          <IoHome size={26} />
          Home
        </Button>
        <Button className={"flex flex-col items-center text-sm"}>
          <MdCategory size={26} />
          Category
        </Button>
        <Button className={"flex flex-col items-center text-sm"}>
          <GiShoppingCart size={26} />
          Cart
        </Button>

        <Button className={"flex flex-col items-center text-sm"}>
          <PiUserListFill size={26} />
          Profile
        </Button>
      </div>
    </div>
  );
};

export default BottomNav;
