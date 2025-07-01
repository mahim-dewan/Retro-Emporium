import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAddIcCall, MdOutlineGppBad } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillAlt,
} from "react-icons/fa";
import Bkash from "../../../public/Bkash.jpg"
import Nagad from "../../../public/nagad.jpg"
import Mastercard from "../../../public/mastercard.jpg"
import Visa from "../../../public/visa.jpg"
import Image from "next/image";

const DeliverySlide = () => {
  return (
    <div className="my-10">
      <Sheet>
        {/* Delivery Details */}
        <div className="">
          <div className="px-4 pb-4 flex items-start justify-between border-b border-gray-300">
            <h2 className="font-bold">Delivery Options</h2>
            <SheetTrigger>
              <IoIosArrowBack className="btn-fill text-2xl text-white p-0 m-0" />
            </SheetTrigger>
          </div>
          <div className="p-4 flex items-center border-b border-gray-300 gap-2">
            <FaLocationDot className="text-2xl text-dark" />
            <span className="font-bold">
              Available Delivery Area: All over the Bangladesh
            </span>
          </div>
          <div className="p-4 flex items-center gap-2 border-b border-gray-300">
            <MdOutlineAddIcCall className="text-2xl text-dark" />
            <span>01869709698</span>
          </div>
        </div>

        <SheetContent className={"bg-white"}>
          <SheetHeader>
            <SheetTitle>
              <div className=" pb-4 flex items-start justify-between border-b border-gray-300">
                <h2 className="font-bold">Delivery Options</h2>
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className=" rounded-md w-full bg-white text-sm space-y-4">
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
                        Dhaka <span className="font-semibold">Narayanganj</span>{" "}
                        › Bandar Upazila
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
                      Shipping Charge:{" "}
                      <span className="font-medium">Tk 100</span>
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
                  <Image src={Bkash} alt="bKash" className= "w-16 h-12" width={1000} height={1000} />
                  <Image src={Nagad} alt="bKash" className= "w-16 h-12" width={1000} height={1000} />
                  <Image src={Mastercard} alt="bKash" className= "w-16 h-12" width={1000} height={1000} />
                  <Image src={Visa} alt="bKash" className= "w-16 h-12" width={1000} height={1000} />
                  
                </div>

                {/* Return & Warranty */}
                <div className="border-t pt-4 space-y-2">
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DeliverySlide;
