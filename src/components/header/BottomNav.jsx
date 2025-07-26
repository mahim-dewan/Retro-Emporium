"use client";
import React from "react";
import { IoHome } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import Button from "../utils/Button";
import { CiSquarePlus } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import BottomProfile from "./BottomProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";

const BottomNav = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <div className="bg-white text-dark border-t border-pastel-olive p-2">
      <div className="flex items-end justify-around">
        <Link href={"/"} className={"flex flex-col items-center text-sm"}>
          <IoHome size={26} />
          Home
        </Link>
        {user?.role === "admin" ? (
          <>
            <Link
              href={"/admin/orders"}
              className={"flex flex-col items-center text-sm"}
            >
              <TbTruckDelivery size={26} />
              Orders
            </Link>
            <Link
              href={"/admin/dashboard/create-product"}
              className={"flex flex-col items-center text-sm"}
            >
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
