"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/Retro-logo.png";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormInput from "../utils/FormInput";
import ImageSelector from "../utils/ImageSelector";
import { useEditModalContext } from "@/context/EditFormModalContext";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useUpdateProductMutation,
} from "@/features/api/apiSlice";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { imageUploader } from "@/utils/imageUpload";
import { cleanProductData } from "@/utils/CleanProductData";

const ProductEditForm = () => {
  const {
    editMode,
    setEditMode,
    selectedProduct: product,
    setSelectedProduct,
  } = useEditModalContext();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();

  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const router = useRouter();

  // sub-category filter based on Category
  const filteredSubCategories = subCategories?.filter(
    (sub) => sub.category_id === product?.category_id
  );

  // onChange handler
  const handleChange = (e) => {
    setSelectedProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const results = await imageUploader(imageFiles); // Upload to Cloudinary
      const imageURLs = results?.map((result) => result.secure_url);

      const updatedProduct = cleanProductData(product, imageURLs); // Purified Product

      const res = await updateProduct(updatedProduct).unwrap(); // update api call

      router.refresh();
      toast.success("Updated successfully");

      // all states reset
      setImageFiles([]);
      setPreviewImages([]);
      setEditMode(false);
    } catch (err) {
      return NextResponse.json({
        message: err?.message || "Something went wrong",
      });
    }
  };

  // Cancel Update
  const handleCancleUpdate = () => {
    setEditMode(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    setPreviewImages(product?.images);
  }, [product]);

  if (!editMode) return null;

  return (
    <div className="w-full h-screen bg-white/50 fixed top-0 left-0 z-40">
      <div className="bg-pastel-olive p-4 w-5/6 md:w-4/5 lg:w-3/5 h-[600px] lg:h-[550px] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-50">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <Image src={logo} width={100} height={100} alt="logo" />
          <h1 className="title text-xl">Update Product</h1>
        </div>

        <form onSubmit={handleUpdate}>
          {/* Title */}
          <FormInput
            label="Title"
            placeholder="Duracell - C Batteries (4-Pack)"
            name="title"
            value={product?.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <div className="mb-4">
            <Label htmlFor="description" className="font-semibold">
              Description<span className="text-retro">*</span>
            </Label>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="h-52 w-full"
              placeholder="Type your message here."
              required
            />
          </div>

          {/* Category & Sub-category */}
          <div className="md:flex gap-4 mb-4">
            {/* Category */}
            <div className="flex-1">
              <Label className="font-semibold">
                Categories<span className="text-retro">*</span>
              </Label>
              <Select
                value={product.category_id}
                onValueChange={(value) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    category_id: value,
                    subCategory_id: "",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-40 h-[300px]">
                  {categories?.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-category */}
            <div className="flex-1">
              <Label className="font-semibold">
                Sub-Categories<span className="text-retro">*</span>
              </Label>
              <Select
                value={product.subCategory_id}
                onValueChange={(value) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    subCategory_id: value,
                  }))
                }
                disabled={filteredSubCategories?.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Sub-Category" />
                </SelectTrigger>
                <SelectContent className="bg-white h-[300px] z-40">
                  {filteredSubCategories?.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prices */}
          <div className="flex gap-4 mb-4">
            <FormInput
              label="Regular Price(tk)"
              type="number"
              name="regularPrice"
              placeholder="1150"
              value={product?.regularPrice}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Discount Price(tk)"
              type="number"
              name="discountPrice"
              placeholder="950"
              value={product?.discountPrice}
              onChange={handleChange}
            />
          </div>

          {/* SKU & Size */}
          <div className="flex gap-4 mb-4">
            <FormInput
              label="SKU"
              name="sku"
              placeholder="WS-540"
              value={product?.sku}
              onChange={handleChange}
            />
            <FormInput
              label="Size"
              name="size"
              placeholder="Free or 32,34,36"
              value={product?.size}
              onChange={handleChange}
            />
          </div>

          {/* Brand & Warranty */}
          <div className="flex gap-4 mb-4">
            <FormInput
              label="Brand"
              name="brand"
              placeholder="Gucci"
              value={product?.brand}
              onChange={handleChange}
            />
            <FormInput
              label="Warranty"
              name="warranty"
              placeholder="6 months"
              value={product?.warranty}
              onChange={handleChange}
            />
          </div>

          {/* Images */}
          <ImageSelector
            productData={setSelectedProduct}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
          />

          {/* Buttons */}
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className={"cursor-pointer"} onClick={handleCancleUpdate}>
              Cancel
            </Button>
            <Button
              type="submit"
              className={`btn btn-fill m-0 ${
                isLoading ? "bg-retro/50" : "bg-retro"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm;
