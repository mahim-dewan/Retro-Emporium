module.exports.getProductsByCategory = async ({
  category,
  minPrice,
  maxPrice,
}) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const res = await fetch(url);
  const products = await res.json();
  return products;
};
