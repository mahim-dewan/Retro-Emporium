import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "../utils/Button";
import { FaPlus } from "react-icons/fa";
import { getAllCategories } from "@/lib/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const CategoryFeature = async () => {
  const categories = await getAllCategories();
  const session = await getServerSession(authOptions);
  const user = session?.user || null;

  return (
    <div>
      <div>
        <h2 className="title mt-10">Category Features</h2>
        <p className="text-center mx-4">
          Get Your Desired Product from Featured Category!
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 m-5 place-items-center gap-5  items-stretch">
        {categories?.map((category) => (
          <Link
            href={`/${encodeURIComponent(category?.name)}`}
            key={category._id}
            className="w-26 md:w-32 min-h-fit border border-retro hover:text-white hover:bg-retro active:bg-retro flex flex-col items-center justify-center rounded-lg text-center break-words"
          >
            <Image
              src={category?.image}
              alt={category?.name || "category"}
              width={80}
              height={80}
              className="w-1/2 h-1/2"
            />
            <h2> {category?.name}</h2>
          </Link>
        ))}

        {user?.role === "admin" && (
          <Button className="w-26 md:w-32 min-h-fit border border-pastel-olive hover:text-dark hover:bg-pastel-olive active:text-dark active:bg-pastel-olive flex flex-col items-center justify-center rounded-lg text-center break-words cursor-pointer py-2">
            <FaPlus />
            <h2> Add Category</h2>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryFeature;
