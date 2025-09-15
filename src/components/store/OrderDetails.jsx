"use client";
import React from "react";
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

const OrderDetails = ({ open, setOpen, orderDetail }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white text-black border-none ">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            {orderDetail && <h2 className="mx-4">ID: {orderDetail?.id}</h2>}
          </DialogDescription>
        </DialogHeader>

        {orderDetail ? (
          <div className="p-4">
            {/* Customer  */}
            <div>
              <h3 className="font-semibold text-xl my-2">
                Customer :----------------------
              </h3>
              <div className="flex items-center justify-between flex-wrap gap-4 px-2">
                <p>
                  <span className="font-semibold">Name: </span>
                  {"Mahim Dewan"}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {"01869709698"}
                </p>

                <p>
                  <span className="font-semibold">Email: </span>
                  {"mahimdewan@gmail.com"}
                </p>

                <p>
                  <span className="font-semibold">Addr: </span>
                  {"Amin golli 3, House No. 54"}
                </p>

                <p>
                  <span className="font-semibold">City: </span>
                  {"Narayanganj"}
                </p>
              </div>
            </div>

            {/* Product  */}
            <div>
              <h2 className="font-semibold text-xl my-2">
                Product:-------------------------
              </h2>
              <div className="flex items-center justify-between flex-wrap gap-4 px-2">
                <p>
                  <span className="font-semibold">Quantity: </span>
                  {1}
                </p>

                <p>
                  <span className="font-semibold">Category: </span>
                  {"Fashion"}
                </p>

                <p>
                  <span className="font-semibold">Delivered At: </span>
                  {"25/07/2024"}
                </p>

                <p>
                  <span className="font-semibold">Shipping Fee: </span>
                  {"Free"}
                </p>
              </div>
            </div>

            {/* Payment  */}
            <div>
              <h2 className="font-semibold text-xl my-2">
                Payment:------------------------
              </h2>
              <div className="flex items-center justify-between flex-wrap gap-4 px-2">
                <p>
                  <span className="font-semibold">Method: </span>
                  {"Cash On Delivery"}
                </p>

                <p>
                  <span className="font-semibold">Amount: </span>
                  {540}tk
                </p>

                <p>
                  <span className="font-semibold">Status: </span>
                  {"Pending"}
                </p>

                <p>
                  <span className="font-semibold">Shipping Fee: </span>
                  {"Free"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="p-4  text-center">Click a item to show details</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
