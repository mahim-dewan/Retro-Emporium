"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoHome } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import Button from "../utils/Button";
import { CiSquarePlus } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import BottomProfile from "./BottomProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { countCartItems } from "@/utils/cart";

const BottomNav = () => {
  const [cartItems, setCartItems] = useState([]);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCart = () => {
      const items = JSON.parse(localStorage.getItem("retro-cart")) || [];
      setCartItems(items);
    };

    // First load
    updateCart();

    // Listen for cart update event
    window.addEventListener("retroCartUpdated", updateCart);

    // Cleanup listener on unmount
    return () => window.removeEventListener("retroCartUpdated", updateCart);
  }, []);

  // Calculate total quantity with useMemo for efficiency
  const totalQuantity = useMemo(() => countCartItems(cartItems), [cartItems]);

  return (
    <div className="bg-white text-dark border-t border-pastel-olive p-2">
      <div className="flex items-end justify-around">
        <Link href={"/"} className={"flex flex-col items-center text-sm"}>
          <IoHome size={26} aria-label="Home" />
          Home
        </Link>

        {/* Conditionally render of user vs admin  */}
        {user?.role === "admin" ? (
          <>
            <Link
              href={"/admin/dashboard/orders"}
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
              <MdCategory size={26} aria-label="Category" />
              Category
            </Button>
            <Link
              href={"/store/cart"}
              className={"flex flex-col items-center text-sm"}
            >
              <div className="relative">
                <GiShoppingCart size={26} aria-label="Cart" />
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-retro text-white absolute bottom-3 -right-3">
                  {totalQuantity}
                </Badge>
              </div>
              Cart
            </Link>
          </>
        )}

        <BottomProfile user={user} />
      </div>
    </div>
  );
};

export default BottomNav;
