"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// React Icons
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import Button from "../utils/Button";

const priceRanges = [
  { value: "under 50$", min: 0, max: 50 },
  { value: "50$-100$", min: 50, max: 100 },
  { value: "100$-200$", min: 100, max: 200 },
  { value: "over 200$", min: 200, max: Infinity },
];

const PriceRange = ({ category, setPriceRange }) => {
  // For currently selected price range
  const [selected, setSelected] = useState(null);
  // For Dropdown position
  const [position, setPosition] = React.useState("bottom");
  // For Dropdown open and close
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-2/6">
      {/* Price Range for Mobile  */}
      <div className="shadow-sm shadow-dark rounded-md md:hidden m-5 p-2">
        <div></div>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            {isOpen ? (
              <IoMdClose
                className="text-retro text-2xl font-bold"
                onClick={() => setIsOpen(false)}
              />
            ) : selected ? (
              <FaFilter
                className="text-retro text-2xl font-bold"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <CiFilter
                className="text-retro text-2xl font-bold"
                onClick={() => setIsOpen(true)}
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white mx-5 my-2 border-none shadow-lg shadow-dark md:hidden">
            <div className="flex justify-between items-center">
              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              <Link
                href={`/${category}`}
                className={"text-retro"}
                onClick={() => {
                  setSelected(null);
                  setPriceRange({});
                  setIsOpen(false);
                }}
              >
                Clear
              </Link>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              className="grid grid-cols-2 gap-2"
              value={position}
              onValueChange={setPosition}
            >
              {priceRanges?.map((range) => (
                <Link
                  href={`/${category}?min Price=${range?.min}&max Price=${range?.max}`}
                  onClick={() => {
                    setSelected(range);
                    setPriceRange(range);
                    setIsOpen(false);
                  }}
                  className={`text-center py-2 rounded-lg text-sm font-medium transition-all duration-500
            ${
              selected?.value === range?.value
                ? "bg-retro text-white shadow border border-white"
                : "bg-white text-gray-700 border border-gray-300"
            }
              
            `}
                >
                  {range?.value}
                </Link>
              ))}
              <Button
                className={
                  " py-2 rounded-lg text-lg flex justify-center font-medium transition-all duration-500 btn-outline m-0 hover:bg-retro hover:text-white"
                }
              >
                <FaPlus />
              </Button>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Price Range for large device */}
      <div className=" box-shadow ">
        <Link
          href={`/${category}`}
          className={"text-retro hover:underline"}
          onClick={() => {
            setSelected(null);
            setPriceRange({});
            setIsOpen(false);
          }}
        >
          Clear All
        </Link>
      </div>
      <Accordion type="single" collapsible className=" h-fit box-shadow">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={"text-xl flex items-center cursor-pointer"}
          >
            Price Range
          </AccordionTrigger>
          <AccordionContent className=" grid grid-cols-2 gap-2">
            {priceRanges.map((range) => (
              <Link
                href={`/${category}?min Price=${range?.min}&max Price=${range?.max}`}
                onClick={() => {
                  setSelected(range);
                  setPriceRange(range);
                }}
                className={`text-center py-2 rounded-lg text-sm font-medium transition-all duration-500
            ${
              selected?.value === range.value
                ? "bg-retro text-white shadow border border-white"
                : "bg-white text-gray-700 border border-gray-300"
            }
              
            `}
              >
                {range.value}
              </Link>
            ))}
            <Button
              className={
                " py-2 rounded-lg text-lg flex justify-center font-medium transition-all duration-500 btn-outline m-0 hover:bg-retro hover:text-white"
              }
            >
              <FaPlus />
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PriceRange;
