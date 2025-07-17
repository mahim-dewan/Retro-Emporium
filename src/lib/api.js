// Fetch Products for "Just for you" Section
export const getJustForYouProducts = async () => {
  const url = `${process.env.BASE_API}/products`;
  const res = await fetch(url, { cache: "no-store" });
  const products = await res.json();
  return products;
}; 

// Fetch all Categories
export const getAllCategory = async () => {
  const url = `${process.env.BASE_API}/categories/getCategory`;
  const res = await fetch(url, { cache: "no-store" });
  const categories = await res.json();

  return categories;
};

