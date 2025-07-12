// Fetch Products for "Just for you" Section
export const getJustForYouProducts = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API}api/products`;
  const res = await fetch(url, { cache: "no-store" });
  const products = await res.json();
  return products;
};

// Fetch for filtered products
export const getProductsByFilter = async ({ category, minPrice, maxPrice }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const res = await fetch(url);
  const products = await res.json();
  return products;
};

// Fetch all Categories
export const getAllCategory = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/categories/getAllCategory`;
  const res = await fetch(url, { cache: "no-store" });
  const categories = await res.json();

  return categories;
};

// Fetch Single Product
export const getProductByID = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/products/${id}`
  );
  const data = await res.json();
  return data;
};

// Verify Request
export const emailVerify = async (body) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/verify`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return { status: res.status, ...data };
};

// Resend OTP
export const resendOTP = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/resendOTP`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const data = await res.json();
  return { status: res.status, ...data };
};
