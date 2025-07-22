import React from "react";
import { IoHome } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import Button from "../utils/Button";
import { CiSquarePlus } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import BottomProfile from "./BottomProfile";
import Link from "next/link";

const BottomNav = async () => {
  // Get Login user
  const session = await getServerSession(authOptions);
  const user = session?.user || null;

  return (
    <div className="bg-white text-dark border-t border-pastel-olive p-2">
      <div className="flex items-end justify-around">
        <Link href={"/"} className={"flex flex-col items-center text-sm"}>
          <IoHome size={26} />
          Home
        </Link>
        {user?.role === "admin" ? (
          <>
            <Link href={"/admin/orders"} className={"flex flex-col items-center text-sm"}>
              <TbTruckDelivery size={26} />
              Orders
            </Link>
            <Link href={"/admin/add-product"} className={"flex flex-col items-center text-sm"}>
              <CiSquarePlus size={26} />
              Add
            </Link>
          </>
        ) : (
          <>
            <Button className={"flex flex-col items-center text-sm"}>
              <MdCategory size={26} />
              Category
            </Button>
            <Button className={"flex flex-col items-center text-sm"}>
              <GiShoppingCart size={26} />
              Cart
            </Button>
          </>
        )}

        <BottomProfile user={user} />
      </div>
    </div>
  );
};

export default BottomNav;
