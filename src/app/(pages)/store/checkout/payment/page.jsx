"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import cards from "../../../../../../public/payments/cards.png";
import bank from "../../../../../../public/payments/bank.png";
import mobileBank from "../../../../../../public/payments/mobileBank.png";
import cashondelivery from "../../../../../../public/payments/cashondelivery.png";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Constants
const STORAGE_KEY = "retro-cart";
const ORDER_KEY = "orderData";

const payments = [
  { label: "Credit/Debit Cards", img: cards, name: "payment" },
  { label: "Bank Payment", img: bank, name: "payment" },
  { label: "Mobile Banking", img: mobileBank, name: "payment" },
  { label: "Cash On Delivery", img: cashondelivery, name: "payment" },
];

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const router = useRouter();

  const orderItems = orderDetails?.products ?? [];

  /** Load order details and cart on mount */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setCartItems(items.reverse());
    };

    const orderData = JSON.parse(sessionStorage.getItem(ORDER_KEY));
    setOrderDetails(orderData);
    loadCart();
  }, []);

  const handleConfirm = () => {
    if (!orderItems.length) return;

    // Remove confirmed products from cart
    const updatedCart = cartItems?.filter(
      (item) => !orderItems.some((i) => i._id === item._id)
    );

    localStorage.setItem("retro-cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("retroCartUpdated"));

    setOrderDetails((prev) => ({
      ...prev,
      paymentMethod,
    }));
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen p-2 bg-pastel-olive text-dark ">
      <div className="max-w-[500px] md:max-w-full mx-auto my-10">
        <div className="md:flex justify-evenly gap-4 items-center">
          <div>
            <h2 className="text-2xl font-semibold my-5">
              Select Payment Method
            </h2>

            {payments.map((item) => (
              <Label
                htmlFor={item.label}
                className="grid grid-cols-4 items-center gap-6 cursor-pointer bg-white px-2 rounded-md text-dark my-5"
              >
                <Input
                  className="w-10 h-10 accent-retro"
                  type="radio"
                  name={item.name}
                  id={item.label}
                  value={item.label}
                  checked={paymentMethod == item.label}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="text-left text-xl col-span-2">
                  {item.label}
                </span>
                <Image alt="cards" src={item.img} className="w-16 h-16" />
              </Label>
            ))}
          </div>

          <div className="bg-white p-4 flex flex-col items-center justify-center text-dark rounded-md">
            <h2 className="text-xl p-4">Add Promo Code</h2>
            <Input
              type="text"
              className={
                "bg-pastel-olive outline-none focus:outline-none text-dark font-bold border-none max-w-[200px]"
              }
            />
            <Button
              className={
                "btn-fill bg-pastel-olive hover:bg-[#96b17f] active:bg-[#96b17f] text-dark border-none"
              }
            >
              Apply
            </Button>
          </div>
        </div>

        <p className="py-5 text-2xl font-semibold text-center">
          Total Amount :{" "}
          <span className="font-bold"> {orderDetails?.totalAmount}</span>tk
        </p>
        <Button
          className={"btn-fill  mx-auto block"}
          disabled={paymentMethod ? false : true}
          onClick={handleConfirm}
        >
          Confirm Order
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="sm:max-w-[425px] bg-white text-black border-none [&>button]:hidden"
        >
          <DialogHeader>
            <DialogTitle>Thank You for your order ✅</DialogTitle>
            <DialogDescription>
              Your order has been placed successfully. We will deliver it soon.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className={"btn-outline my-0 md:my-5"}
              onClick={() => router.replace("/store/my-orders")}
            >
              View Order
            </Button>

            <Button
              type="submit"
              className={"btn-fill my-0 md:my-5"}
              onClick={() => router.replace("/")}
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
