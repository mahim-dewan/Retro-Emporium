"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaMapMarkerAlt, FaTruck, FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlineGppBad } from "react-icons/md";

// Assets
import Bkash from "../../../../../public/Bkash.jpg";
import Nagad from "../../../../../public/nagad.jpg";
import Mastercard from "../../../../../public/mastercard.jpg";
import Visa from "../../../../../public/visa.jpg";

// Components
import Quantity from "@/components/product/Quantity";
import Button from "@/components/utils/Button";
import DeliverySlide from "@/components/product/DeliverySlide";
import ProductTabDescription from "@/components/product/ProductTabDescription";
import RelatedProducts from "@/components/product/RelatedProducts";

import { handleAddToCart } from "@/utils/cart";

// API
import {
  useGetCategoryQuery,
  useGetProductByIDQuery,
} from "@/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { calculateDiscountPersent } from "@/utils/productUtils";

const ProductDetails = ({ params }) => {
  const { id } = params;
  const [activeImage, setActiveImage] = useState(null);
  const router = useRouter();

  const paymentImages = [Bkash, Nagad, Mastercard, Visa];

  // Product Query
  const {
    data: product,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetProductByIDQuery(id);

  // Category Query (skip if product not ready)
  const { data: category } = useGetCategoryQuery(product?.category_id, {
    skip: !product?.category_id,
  });

  // Set active image when product loads
  useEffect(() => {
    if (isSuccess && product?.images?.length > 0) {
      setActiveImage(product?.images[0]);
    }
  }, [isSuccess, product]);

  // Handle loading state
  if (isLoading)
    return <p className="text-center py-10 min-h-screen">Loading product...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-600 min-h-screen">
        {error?.message || "Failed to load product."}
      </p>
    );

  // Price & discount calculation
  const discountPercent = calculateDiscountPersent(product);

  return (
    <div className="min-h-screen">
      <div className="m-2 p-4 lg:flex items-start gap-6 ">
        {/* Product Details  */}
        <div className="max-w-[400px] md:max-w-full mx-auto md:flex justify-center items-start gap-6 w-full">
          {/* Product Image (Left side)  */}
          <div className="md:w-[500px]">
            <Image
              alt="product image"
              src={activeImage}
              width={4000}
              height={3000}
              className="w-full md:w-[500px] h-[400px] bg-white border-2 object-cover border-retro rounded-md"
              quality={100}
              unoptimized
            />

            {/* Thumbnails */}
            <div className="my-2 flex flex-wrap gap-2">
              {product?.images.map((image, i) => (
                <Image
                  key={i}
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
              {category?.name && <p>Category: {category?.name}</p>}
              {product?.sold && <p>sold: {product?.sold}</p>}
              {product?.size && <p>size: {product?.size}</p>}
            </div>

            {/* Price  */}
            <div className="flex items-center justify-between pt-5">
              <h3>
                <span className="text-2xl font-bold">
                  TK {product?.discountPrice}{" "}
                </span>
                {product?.regularPrice && (
                  <span className="text-sm line-through text-gray-500">
                    TK {product?.regularPrice}
                  </span>
                )}
              </h3>

              {discountPercent > 0 && (
                <p className="text-retro font-semibold">
                  {discountPercent}% Off
                </p>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col justify-center items-center gap-2">
              <Quantity className={"flex-1"} product={product} />
              <div className=" box-shadow flex w-full items-center flex-2 gap-2 m-0">
                <Button
                  className={
                    "btn-fill px-3 py-2 m-0 w-full my-1 text-white flex items-center justify-center gap-1"
                  }
                >
                  <FaTruckArrowRight className="text-2xl" />
                  Order Now
                </Button>
                <Button
                  handler={() => {
                    handleAddToCart(product);
                    router.refresh();
                  }}
                  className={
                    "btn-fill px-3 py-2 m-0 w-full my-1 text-white flex items-center justify-center"
                  }
                >
                  <GiShoppingCart className="text-2xl" />
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
                {paymentImages?.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt="bKash"
                    className="w-16 h-12"
                    width={1000}
                    height={1000}
                  />
                ))}
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

      {/* Description + Related */}
      <ProductTabDescription description={product?.description} />
      <RelatedProducts product={product} />
    </div>
  );
};

export default ProductDetails;
