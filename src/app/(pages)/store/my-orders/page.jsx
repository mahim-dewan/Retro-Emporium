"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaExternalLinkAlt } from "react-icons/fa";
import cards from "../../../../../public/payments/cards.png";

import { Badge } from "@/components/ui/badge";
import MyOrderFilter from "@/components/store/MyOrderFilter";
import OrderDetails from "@/components/store/OrderDetails";

{
  /**Dami Data */
}
const orders = [
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784564",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784565",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784566",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784567",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784568",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784569",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
  {
    date: "25/04/2025",
    id: "5665465e45dfsd98784570",
    status: "Pending",
    quantity: 1,
    total: 450,
  },
];

const MyOrders = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  const handleOrderDetails = (item) => {
    // Only open dialog on mobile (<1024px)
    if (window.innerWidth < 1024) {
      setOpenDetails(true);
    }
    setOrderDetail(item);
  };

  return (
    <div className="min-h-screen p-2 ">
      <div className="flex items-start justify-between flex-col-reverse lg:flex-row">
        {/* My order list */}
        <div className="w-full lg:w-2/3">
          {/** Order Filter component*/}
          <MyOrderFilter />

          <ul className="p-2 w-full">
            {orders.map((item, i) => (
              <li
                className={`box-shadow my-1 ${
                  item?.id === orderDetail?.id && "border-retro border-2"
                }`}
                key={i}
                onClick={() => handleOrderDetails(item)}
              >
                <p>
                  <span className="font-semibold">ID:</span> {item?.id}
                </p>
                <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                  <p>{item?.date}</p>
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums border-retro text-retro font-semibold">
                    {item?.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1/2 max-w-[400px]">
                    <Image src={cards} className="w-10 sm:w-20 h-10 sm:h-20" />
                    <Link href={""} className="line-clamp-2 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquam, voluptas!
                    </Link>
                  </div>
                  <div className="flex items-center justify-around sm:justify-between gap-2 flex-1/2">
                    <div className="mx-auto">
                      <p>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {item?.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Total:</span>{" "}
                        {item.total}
                        tk
                      </p>
                    </div>
                    <Link
                      href={`/products/${orderDetail?.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-retro px-2 sm:hidden"
                    >
                      <FaExternalLinkAlt />
                    </Link>
                    <Link
                      href={`/products/${item?.id}`}
                      className="btn-fill m-0 py-1 hidden sm:block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      See Item
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Details (Only Tablet/Desktop) */}
        <div className="w-full lg:w-1/3 h-screen rounded-lg bg-pastel-olive text-dark lg:sticky top-20 hidden lg:block">
          <h2 className="p-4 pb-0 text-2xl">Order Details</h2>
          {orderDetail && <h2 className="mx-4">ID: {orderDetail?.id}</h2>}

          {/* {orderDetail && <p>ID:{orderDetail?.id}</p>} */}
          {orderDetail ? (
            <div className="p-4">
              {/* Customer  */}
              <div>
                <h3 className="font-semibold text-xl my-2">
                  Customer :---------------------------
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

              {/* Payment  */}
              <div>
                <h2 className="font-semibold text-xl my-2">
                  Payment:-----------------------------
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

              {/* Product  */}
              <div>
                <h2 className="font-semibold text-xl my-2">
                  Product:------------------------------
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
            </div>
          ) : (
            <p className="p-4  text-center">Click a item to show details</p>
          )}
        </div>

        <OrderDetails
          open={openDetails}
          setOpen={setOpenDetails}
          orderDetail={orderDetail}
        />
      </div>
    </div>
  );
};

export default MyOrders;
