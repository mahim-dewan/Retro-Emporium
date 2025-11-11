"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const category = {
  _id: { $oid: "665f6c8fbf1b2a4d8e0a0001" },
  name: "Fashion",
  description:
    "Trendy and seasonal clothing, footwear, and accessories for men, women, and children from local and international brands.",
  image: "https://i.ibb.co/s9N5tTmw/fashion.png",
  subCategory: ["Tshirt", "Polo", "Pant", "Jeans"],
};

const Categories = () => {
  const handleEdit = (e) => {
    e.stopPropagation();
  };
  const handleDelete = (e) => {
    e.stopPropagation();
  };
  return (
    <div>
      <div className=" bg-white pb-2 z-30">
        <h2 className="title text-dark text-start py-2">Categories</h2>
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="px-2 py-1 rounded-md border border-retro focus:outline-retro  mb-"
            placeholder="Search Category"
          />
          <Button className={"btn-fill my-0"}>Add</Button>
        </div>
      </div>
      <Accordion type="single" collapsible>
        {Array.from({ length: 20 }).map((_, i) => (
          <AccordionItem
            key={i + 1}
            value={i + 1}
            className={`${
              i % 2 === 0 ? "bg-dark/30" : "bg-dark/20"
            } font-semibold border-none group`}
          >
            <AccordionTrigger
              className={"flex justify-between items-center mr-2"}
            >
              <div className="flex items-center gap-2">
                <Image
                  alt={category.name}
                  src={category.image}
                  width={100}
                  height={100}
                  className="w-14 h-14"
                />
                <span>{category.name}</span>
              </div>
              <div className="flex items-center justify-self-end gap-4 ml-auto text-dark lg:hidden group-hover:flex">
                <FaRegEdit
                  size={26}
                  className="cursor-pointer hover:text-retro active:text-retro"
                  onClick={handleEdit}
                />
                <MdOutlineDeleteForever
                  size={30}
                  className="cursor-pointer hover:text-retro active:text-retro"
                  onClick={handleDelete}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className={"px-2 flex flex-wrap items-start"}>
              {category?.subCategory?.map((sub) => (
                <Button className={"btn-outline"}>{sub}</Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Categories;
