"use client";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

const ImageSelector = ({
  productData,
  previewImages,
  setPreviewImages,
  imageFiles,
  setImageFiles,
}) => {
  const fileInputRef = useRef(null); // Used in image input

  const handleSelectImage = (e) => {
    const file = e.target.files?.[0];
    setPreviewImages([...previewImages, URL.createObjectURL(file)]); // images local link for show selected images in form
    setImageFiles([...imageFiles, file]); // Image files for upload in cloudinary
    fileInputRef.current.value = null;
  };

  const handleDelete = (image) => {
    // Find the index of the image in previewImages
    const index = previewImages.findIndex((i) => i === image);

    if (index !== -1) {
      // Remove image from previewImages
      const filteredImages = previewImages.filter((_, i) => i !== index);

      // Remove file from imageFiles (matching index)
      const filteredFiles = imageFiles.filter((_, i) => i !== index);

      // Update states
      setPreviewImages(filteredImages);
      setImageFiles(filteredFiles);

      // Also update productData if needed
      productData((prev) => ({
        ...prev,
        images: prev?.images?.filter((i) => i !== image),
      }));
    }
  };

  return (
    <>
      <p className=" font-semibold mt-5">
        Select Images<span className="text-retro">*</span>
      </p>
      <div className="my-4 flex items-center justify-start gap-2 flex-wrap">
        {previewImages?.map((image) => (
          <div className="relative group">
            <Image
              src={image}
              alt="image"
              className="w-20 h-20 rounded-lg"
              width={1000}
              height={1000}
            />
            <MdDeleteForever
              onClick={() => handleDelete(image)}
              className="absolute  top-1 right-1 cursor-pointer text-retro bg-white rounded-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
            />
          </div>
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
