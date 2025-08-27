// Fetch Products for "Just for you" Section
export const getJustForYouProducts = async () => {
  const url = `${process.env.BASE_API}/products/justforyou`;
  const res = await fetch(url, { cache: "no-store" });
  const products = await res.json();
  return products;
};

// All Products 
export const allProducts = async ({page}) => {
  const url = `${process.env.BASE_API}/products?page=${page}`;
  const res = await fetch(url, { cache: "no-store" });
  const products = await res.json();
  return products;
}; 

// Fetch all Categories
export const getAllCategories = async () => {
  const url = `${process.env.BASE_API}/categories/getCategories`;
  const res = await fetch(url, { cache: "no-store" });
  const categories = await res.json();

  return categories;
};

