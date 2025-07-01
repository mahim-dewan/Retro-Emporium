export const getProductsByFilter = async ({
  category,
  minPrice,
  maxPrice,
}) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const res = await fetch(url);
  const products = await res.json();
  return products;
};

export const getAllCategory = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/categories/getAllCategory`
  );
  const categories = await res.json();
  return categories
};

export const getProductByID = async(id)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/products/${id}`)
  const data = await res.json()
  return data
}
