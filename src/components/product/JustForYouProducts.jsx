import ProductCard from "@/components/product/ProductCard";
import { getJustForYouProducts } from "@/lib/api";
import Link from "next/link";

const JustForYouProducts = async () => {
  const { products } = await getJustForYouProducts();

  return (
    <div className="flex flex-col justify-between min-h-[80vh]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 lg:m-2">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Link
        href={"products"}
        className="title text-base w-fit mx-auto underline my-5"
      >
        {"See More>>>"}
      </Link>
    </div>
  );
};

export default JustForYouProducts;
