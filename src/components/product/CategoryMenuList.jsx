import { getAllCategory } from "@/utils/api";
import Link from "next/link";

const CategoryMenuList = async () => {
  const { categories } = await getAllCategory();

  return (
    <div className="flex flex-wrap items-center gap-3 p-2 bg-dark/60 text-white justify-start xl:justify-center">
      {categories?.map((category, i) => {
        if (i < 10) {
          return (
            <Link
              key={category._id}
              href={`/${category.name}`}
              className=" hover:underline font-bold"
            >
              {category.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default CategoryMenuList;
