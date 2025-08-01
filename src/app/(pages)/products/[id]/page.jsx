"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaMapMarkerAlt, FaTruck, FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlineGppBad } from "react-icons/md";
import Bkash from "../../../../../public/Bkash.jpg";
import Nagad from "../../../../../public/nagad.jpg";
import Mastercard from "../../../../../public/mastercard.jpg";
import Visa from "../../../../../public/visa.jpg";
import Quantity from "@/components/product/Quantity";
import Button from "@/components/utils/Button";
import DeliverySlide from "@/components/product/DeliverySlide";
import ProductTabDescription from "@/components/product/ProductTabDescription";
import RelatedProducts from "@/components/product/RelatedProducts";
import { useGetProductByIDQuery } from "@/features/api/apiSlice";

const ProductDetails = ({ children, params }) => {
  const [activeImage, setActiveImage] = useState();
  const { id } = use(params);
  const {
    data: product,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetProductByIDQuery(id);


  useEffect(() => {
    if (!isLoading && isSuccess) {
      setActiveImage(product?.images[0]);
    }
  }, [product]);

  return (
    <div className="min-h-screen">
      <div className="m-2 p-4 lg:flex items-start gap-6 ">
        {/* Product Details  */}
        <div className="max-w-[400px] md:max-w-full mx-auto md:flex justify-center items-start gap-6 w-full">
          {/* Product Image (Left side)  */}
          <div className="md:w-[500px] flex-1/2">
            <Image
              alt="product image"
              src={activeImage}
              width={4000}
              height={3000}
              className="w-full md:w-[500px] h-[400px] bg-white border-2 object-cover border-retro rounded-md"
              quality={100}
              unoptimized
            />
            {/* all images  */}
            <div className="my-2 flex">
              {product?.images.map((image) => (
                <Image
                  alt="title"
                  src={image}
                  width={400}
                  height={300}
                  className={`w-20 h-20 object-cover bg-white p-1 overflow-hidden rounded-xl  ${
                    image === activeImage && "border border-retro "
                  }`}
                  onClick={() => setActiveImage(image)}
                  quality={100}
                  unoptimized
                />
              ))}
            </div>
          </div>

          {/* Product Details (Right side) */}
          <div className="flex-1/2">
            <h2 className="title text-start text-dark">{product?.title}</h2>
            <div className="border-b border-gray-300 pb-5">
              {product?.sku && <p>SKU : {product?.sku}</p>}
              <p>Category: {product?.category}</p>
              <p>sold: 20</p>
              {product?.size && <p>size: {product?.size}</p>}
            </div>
            <div className="flex items-center justify-between pt-5">
              <h3>
                <span className="text-2xl font-bold">
                  TK {product?.discountPrice}{" "}
                </span>
                <span className="text-sm line-through">
                  TK {product?.regularPrice}
                </span>
              </h3>
              <p className="text-retro font-semibold">
                {Math.round(
                  ((product?.regularPrice - product?.discountPrice) /
                    product?.regularPrice) *
                    100
                )}
                % Off
              </p>
            </div>

            <div className="flex justify-center items-start gap-2">
              {/* Quantity  */}
              <Quantity />

              {/* cart and order button  */}
              <div className=" box-shadow flex flex-col items-center flex-2 md:m-0">
                <Button
                  className={
                    "btn-fill px-3 py-2 m-0 w-full my-1 text-white flex items-center justify-center gap-1"
                  }
                >
                  <FaTruckArrowRight className="text-2xl" />
                  Order Now
                </Button>
                <Button
                  className={
                    "btn-fill px-3 py-2 m-0 w-full my-1 text-white flex items-center justify-center"
                  }
                >
                  <GiShoppingCart className="text-3xl" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details (Mobile Only)  */}
        <div className="md:hidden">
          <DeliverySlide />
        </div>

        {/* Delivery Details (Desktop Only)  */}
        <div className="hidden md:block my-10 lg:m-0">
          <div className=" pb-4 flex items-start justify-between border-b border-gray-300">
            <h2 className="font-bold">Delivery Options</h2>
          </div>

          <div className=" rounded-md w-full bg-white text-sm space-y-4 flex lg:block items-start justify-between">
            <div className="pt-4">
              {/* Delivery Area */}
              <div>
                <div className="mt-2 flex items-start gap-2">
                  <FaMapMarkerAlt className="text-retro mt-1" />
                  <div>
                    <p className="font-medium">
                      Available Delivery Area:{" "}
                      <span className="text-black font-semibold">
                        All over the Bangladesh.
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Dhaka <span className="font-semibold">Narayanganj</span> ›
                      Bandar Upazila
                    </p>
                    <button className="text-retro text-xs underline mt-1">
                      CHANGE
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-start gap-2">
                <FaTruck className="text-retro mt-1" />
                <div>
                  <p>
                    Delivery Time:{" "}
                    <span className="font-medium">1 - 7 working days</span>
                  </p>
                  <p>
                    Shipping Charge: <span className="font-medium">Tk 100</span>
                  </p>
                </div>
              </div>

              {/* Cash on Delivery */}
              <div className="flex items-center gap-2">
                <FaMoneyBillAlt className="text-green-600" />
                <span>Cash on Delivery Available</span>
              </div>

              {/* Payment Methods */}
              <div className="flex gap-2 flex-wrap items-center">
                <Image
                  src={Bkash}
                  alt="bKash"
                  className="w-16 h-12"
                  width={1000}
                  height={1000}
                />
                <Image
                  src={Nagad}
                  alt="bKash"
                  className="w-16 h-12"
                  width={1000}
                  height={1000}
                />
                <Image
                  src={Mastercard}
                  alt="bKash"
                  className="w-16 h-12"
                  width={1000}
                  height={1000}
                />
                <Image
                  src={Visa}
                  alt="bKash"
                  className="w-16 h-12"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>

            {/* Return & Warranty */}
            <div className="lg:border-t border-gray-300 pt-4 space-y-2">
              <p className="font-semibold">Return & Warranty</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Cancellation, Return & Refund</li>
                <li>Change of mind is not applicable</li>
              </ul>
              <div className="flex items-center gap-2 text-red-600">
                <MdOutlineGppBad className="text-lg" />
                <span>Warranty Not Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductTabDescription description={product?.description} />
      <RelatedProducts product={product} />
    </div>
  );
};

export default ProductDetails;
