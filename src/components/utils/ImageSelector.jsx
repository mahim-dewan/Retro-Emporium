"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

const ImageSelector = ({images, setImages, imageFiles, setImageFiles }) => {
  const fileInputRef = useRef(null); // Used in image input

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    setImages([...images, URL.createObjectURL(file)]); // images local link for show selected images in form
    setImageFiles([...imageFiles, file]); // Image files for upload in cloudinary
    fileInputRef.current.value = null;
  };

  return (
    <>
      <p className=" font-semibold mt-5">
        Select Images<span className="text-retro">*</span>
      </p>
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
            onChange={handleSelectImage}
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
    </>
  );
};

export default ImageSelector;
