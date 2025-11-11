"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import CartItem from "@/components/product/CartItem";
import { Input } from "@/components/ui/input";
import Button from "@/components/utils/Button";
import { countCartItems } from "@/utils/cart";

const STORAGE_KEY = "retro-cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  // Get only checked/selected items
  const checkedItems = useMemo(
    () => cartItems.filter((item) => item.checked),
    [cartItems]
  );

  // Calculate subtotals dynamically
  const subtotal = React.useMemo(
    () =>
      checkedItems.reduce((acc, product) => {
        const price = product.discountPrice ?? product.regularPrice ?? 0;
        return acc + price * (product.quantity || 1);
      }, 0),
    [checkedItems]
  );

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  // Remove item from cart
  const handleRemoveCart = (product) => {
    const filteredItems = cartItems?.filter((item) => item._id !== product._id);

    localStorage.setItem("retro-cart", JSON.stringify(filteredItems));
    setCartItems(filteredItems);
    window.dispatchEvent(new Event("retroCartUpdated"));
    toast.warn("Removed a cart item");
  };

  /** Checkout handler */
  const handleCheckout = () => {
    if (checkedItems.length > 0) {
      sessionStorage.setItem(
        "checkoutItems",
        JSON.stringify({
          products: checkedItems,
          totalAmount: total,
          deliveyCharge: shippingFee,
        })
      );
      router.push("/store/checkout");
    } else {
      alert("Please select the product");
    }
  };

  // Load cart from localStorage and listen to updates
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setCartItems(items.reverse());
    };
    loadCart();

    window.addEventListener("retroCartUpdated", loadCart);

    // Cleanup listener on unmount
    return () => window.removeEventListener("retroCartUpdated", loadCart);
  }, []);

  if (cartItems.length === 0) {
    return (
      <p className="min-h-96 text-2xl flex justify-center items-center">
        No cart items added
      </p>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-2">
      <ul className="w-full lg:w-3/4">
        <li className="bg-pastel-olive p-4 hidden md:grid grid-cols-4 justify-around text-md font-bold my-5 rounded-lg">
          <h2 className="col-span-3">Product</h2>
          <h2 className="text-center ">Quantity</h2>
        </li>

        {cartItems.map((product) => (
          <CartItem
            key={product._id}
            product={product}
            onRemoveCart={handleRemoveCart}
          />
        ))}
      </ul>

      {/* Checkout box  */}
      <div className="w-full lg:w-1/4  ">
        <div className="box-shadow bg-pastel-olive w-full h-fit sticky top-24 mx-auto">
          {/* Location  */}
          <div className="flex flex-col items-start gap-2 border-b border-gray-300 pb-3 ">
            <h3>Location</h3>
            <span className="flex items-center gap-2">
              <CiLocationOn />
              <p className="font-semibold">
                {" "}
                Free delivery all over Bangladesh
              </p>
            </span>
          </div>

          {/* Order Summary  */}
          <div className="border-b border-gray-300 pb-4">
            <h2 className="text-xl font-bold my-2">Order Summary</h2>
            <div className="flex items-center justify-between px-2 my-2">
              <span>Subtotal</span>
              <span className="font-semibold">TK {subtotal}</span>
            </div>
            <div className="flex items-center justify-between px-2 my-2">
              <span>Shipping Fee</span>
              <span className="font-semibold">TK {shippingFee} </span>
            </div>
            <div className="flex items-center justify-between px-2 my-2">
              <span>Discount</span>
              <span className="font-semibold">TK 0 </span>
            </div>
          </div>

          {/* Intotal  */}
          <div className="flex items-center justify-between p-2">
            <span className="text-xl font-bold">Total</span>
            <span className="font-semibold">TK {total}</span>
          </div>

          {/* Voucher token  */}
          <div className="flex w-full max-w-sm items-center mx-auto my-2">
            <Input type="email" placeholder="Coupon Code" className={"py-5"} />
            <Button className={"btn-fill"}>Apply</Button>
          </div>

          <Button
            className={"mx-auto w-full btn-fill text-lg"}
            handler={handleCheckout}
          >
            PROCEED TO CHECKOUT ({countCartItems(checkedItems)})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
