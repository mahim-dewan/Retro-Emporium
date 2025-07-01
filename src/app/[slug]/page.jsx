import ProductDetails from "@/components/product/ProductDetails";
import SinglecategorySlug from "@/components/product/SingleCategorySlug";
import { getAllCategory } from "@/utils/api";
import { notFound } from "next/navigation";

const ProductSlugPage = async ({ params }) => {
  const { slug } = await params;
  const slugString = decodeURIComponent(slug);
  const { categories } = await getAllCategory();

  const categoryName = categories.map((c) => c.name);

  // Products By Category
  if (categoryName.includes(slugString)) {
    return <SinglecategorySlug category={slugString} />;
  }

  // Products Details
  const isValidID = /^[a-fA-F0-9]{24}$/.test(slugString);
  if (isValidID) {
    return (
      <ProductDetails id={slug}>
      </ProductDetails>
    );
  }

  notFound();
};

export default ProductSlugPage;
