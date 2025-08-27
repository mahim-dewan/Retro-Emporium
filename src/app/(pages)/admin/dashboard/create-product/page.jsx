"use client";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../../../public/Retro-logo.png";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/features/api/apiSlice";
import { imageUploader } from "@/utils/imageUpload";
import FormInput from "@/components/utils/FormInput";
import ImageSelector from "@/components/utils/ImageSelector";
import { cleanProductData } from "@/utils/CleanProductData";
import { toast } from "react-toastify";

// Default Product State
const defaultProductState = {
  title: "",
  description: "",
  category_id: "",
  subCategory_id: "",
  regularPrice: "",
  discountPrice: "",
  sku: "",
  size: "",
  brand: "",
  warranty: "",
  images: [],
};

const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState([]); // images local link for show selected images in form
  const [product, setProduct] = useState(defaultProductState);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Image files for upload in cloudinary
  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery();
  const [createProduct, { data }] = useCreateProductMutation();

  // Filter sub-categories
  const filteredSubCategories = subCategories?.filter(
    (c) => c?.category_id === product?.category_id
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const results = await imageUploader(imageFiles); // Upload to Cloudinary
      const imageURLs = results.map((result) => result.secure_url);
      const newProduct = cleanProductData(product, imageURLs);

      // Await and unwrap the result directly
      const res = await createProduct(newProduct).unwrap();

      toast.success("Product created successfully");

      // Reset
      setProduct(defaultProductState);
      setPreviewImages([]);
      setImageFiles([]);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // OnChange Handler
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-5">
      <div className=" bg-pastel-olive p-4 min-w-[300px] w-5/6 md:w-4/5 lg:w-3/5 h-[600px] md:h-full overflow-y-auto mx-auto rounded-lg">
        {/* Form Header  */}
        <div className="flex flex-col justify-center items-center">
          <Image src={logo} width={100} height={100} alt="logo" />
          <h1 className="title text-xl">Create a new Product</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Input  */}
          <FormInput
            label={"Title"}
            placeholder={"Duracell - C Batteries (4-Pack)"}
            name={"title"}
            value={product?.title}
            onChange={handleChange}
            required={true}
          />

          {/* Description Input */}
          <div>
            <Label htmlFor="description" className=" font-semibold">
              Description<span className="text-retro">*</span>
            </Label>
            <Textarea
              className={"h-52 w-full"}
              placeholder="Type your message here."
              required
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          {/* Category  */}
          <div className="md:flex items-start justify-between gap-4">
            {/* Category  */}
            <div className="flex-1">
              <Label htmlFor="categories" className=" font-semibold">
                Categories<span className="text-retro">*</span>
              </Label>
              <Select
                name={"categories"}
                value={product.category_id}
                onValueChange={(value) => {
                  setProduct((prev) => ({
                    ...prev,
                    category_id: value,
                    subCategory_id: "", // reset subCategory_id on category change
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-20 h-[300px]">
                  {categories?.map((c) => (
                    <SelectItem
                      key={c._id}
                      value={c._id}
                      className={"hover:bg-gray-300 cursor-pointer"}
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-Category  */}
            <div className="flex-1">
              <Label htmlFor="subCategories" className=" font-semibold">
                Sub-Categories<span className="text-retro">*</span>
              </Label>
              <Select
                name={"subCategories"}
                value={product.subCategory_id}
                onValueChange={(value) => {
                  setProduct((prev) => ({
                    ...prev,
                    subCategory_id: value,
                  }));
                }}
                disabled={filteredSubCategories?.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Sub-Category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-20 h-[300px]">
                  {filteredSubCategories?.map((c) => (
                    <SelectItem
                      key={c._id}
                      value={c._id}
                      className={"hover:bg-gray-300 cursor-pointer"}
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-start justify-between gap-4">
            {/* regularPrice Input */}
            <FormInput
              label={"Regular Price(tk)"}
              required={true}
              type="number"
              placeholder={"1150"}
              name={"regularPrice"}
              value={product?.regularPrice}
              onChange={handleChange}
            />

            {/* DiscountPrice Input  */}
            <FormInput
              label={"Discount Price(tk)"}
              type="number"
              placeholder={"950"}
              name={"discountPrice"}
              value={product?.discountPrice}
              onChange={handleChange}
            />
          </div>

          {/* SKU and Size  */}
          <div className="flex items-start justify-between gap-4">
            {/* SKU Input  */}
            <FormInput
              label={"SKU"}
              name={"sku"}
              placeholder={"WS-540"}
              value={product?.sku}
              onChange={handleChange}
            />
            {/* Size Input  */}
            <FormInput
              label={"Size"}
              name={"size"}
              placeholder={"Free or 32,34,36"}
              value={product?.size}
              onChange={handleChange}
            />
          </div>

          {/* Brand and Warranty  */}
          <div className="flex items-start justify-between gap-4">
            {/* Brand Input  */}
            <FormInput
              label={"Brand"}
              name={"brand"}
              placeholder={"Gucci"}
              value={product?.brand}
              onChange={handleChange}
            />
            {/* Warranty Input  */}
            <FormInput
              label={"Warranty"}
              name={"warranty"}
              placeholder={"6 months"}
              value={product?.warranty}
              onChange={handleChange}
            />
          </div>

          {/* Image Input  */}
          <ImageSelector
            productData={setProduct}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />

          {/* Buttons  */}
          <div className="flex items-center justify-start gap-2">
            <Button
              type="reset"
              onClick={() => {
                setProduct(defaultProductState);
                setPreviewImages([]);
                setImageFiles([]);
              }}
              className={"btn btn-outline m-0 my-5"}
            >
              Clear
            </Button>

            <Button
              type="submit"
              className={`btn btn-fill m-0 my-5 ${
                isLoading ? "bg-retro/50" : "bg-retro"
              } `}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
