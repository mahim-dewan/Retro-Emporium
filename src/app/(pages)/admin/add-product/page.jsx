"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { useRef, useState } from "react";
import logo from "../../../../../public/Retro-logo.png";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home_appliances", label: "Home Appliances" },
  { value: "books", label: "Books" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "automotive", label: "Automotive" },
  { value: "groceries", label: "Groceries" },
  { value: "furniture", label: "Furniture" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    discountPrice: "",
    sku: "",
    images: [],
  });
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    setProduct({
      title: "",
      description: "",
      category: "",
      subCategory: "",
      price: "",
      discountPrice: "",
      sku: "",
      images: [],
    });
    setImages([]);
  };

  // OnChange Handler
  const handleOnChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Image Handler
  const handleImage = (file) => {
    setProduct({ ...product, images: [...product.images, file] });
  };

  return (
    <div className="min-h-screen py-5">
      <div className=" bg-pastel-olive p-4 w-4/5 md:w-3/5 h-[600px] md:h-full overflow-y-auto mx-auto rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <Image src={logo} width={100} height={100} alt="logo" />
          <h1 className="title text-xl">Create a new Product</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Title  */}
          <div>
            <Label htmlFor="title" className=" font-semibold">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Duracell - C Batteries (4-Pack)"
              required
              name="title"
              value={product.title}
              onChange={handleOnChange}
            />
          </div>
          {/* Description  */}
          <div>
            <Label htmlFor="email" className=" font-semibold">
              Description
            </Label>
            <Textarea
              className={"h-52 w-full"}
              placeholder="Type your message here."
              required
              name="description"
              value={product.description}
              onChange={handleOnChange}
            />
          </div>
          {/* Category  */}
          <div className="md:flex items-start justify-between gap-4">
            {/* Category  */}
            <div className="flex-1">
              <Label htmlFor="email" className=" font-semibold">
                Categories
              </Label>
              <Select
                value={product.category}
                onValueChange={(value) => {
                  setProduct((prev) => ({
                    ...prev,
                    category: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className={"bg-white z-20 h-[300px]"}>
                  {categories?.map((c) => (
                    <SelectItem value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Sub-Category  */}
            <div className="flex-1">
              <Label htmlFor="email" className=" font-semibold">
                Sub-Categories
              </Label>
              <Select
                value={product.subCategory}
                onValueChange={(value) => {
                  setProduct((prev) => ({
                    ...prev,
                    subCategory: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className={"bg-white z-20 h-[300px]"}>
                  {categories?.map((c) => (
                    <SelectItem value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Price  */}
          <div className="flex items-start justify-between gap-4">
            {/* Price  */}
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                placeholder="500"
                name="price"
                value={product?.price}
                onChange={handleOnChange}
              />
            </div>
            {/* Discount  */}
            <div className="flex-1">
              <Label htmlFor="discountPrice"> Discount Price</Label>
              <Input
                type="number"
                placeholder="400"
                name="discountPrice"
                value={product?.discountPrice}
                onChange={handleOnChange}
              />
            </div>
          </div>
          {/* SKU  */}
          <div>
            <Label htmlFor="sku" className=" font-semibold">
              SKU
            </Label>
            <Input
              id="sku"
              type="text"
              placeholder="WS-540"
              required
              name="sku"
              value={product.sku}
              onChange={handleOnChange}
            />
          </div>
          {/* Images  */}
          <p className=" font-semibold mt-5">Select Images</p>
          <div className="my-4 flex items-center justify-start gap-2 flex-wrap">
            {images?.map((image) => (
              <Image
                src={image}
                alt="image"
                className="w-20 h-20 rounded-lg"
                width={1000}
                height={1000}
              />
            ))}
            <div>
              {/* Hidden File Input */}
              <Input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImages([...images, URL.createObjectURL(file)]);
                  handleImage(file);
                  fileInputRef.current.value = null;
                }}
              />

              {/* Custom Label */}
              <label
                htmlFor="upload"
                className="w-20 h-20 text-3xl border border-dashed flex items-center justify-center cursor-pointer rounded-md hover:bg-retro hover:text-white"
              >
                +
              </label>
            </div>
          </div>
          {/* Buttons  */}
          <div className="flex items-center justify-start gap-2">
            <Button className={"btn btn-outline m-0 my-5"}>Cancle</Button>
            <Button type="submit" className={"btn btn-fill m-0 my-5"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
