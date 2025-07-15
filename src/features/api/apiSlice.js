import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}`,
  }),
  endpoints: (builder) => ({
    // *********************** PRODUCT ********************

    getProductByID: builder.query({
      query: (id) => `/products/${id}`,
    }),

    filteredProducts: builder.query({
      query: ({ category, minPrice, maxPrice }) =>
        `/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    }),

    // *********************** Category ********************
    getSubCategory: builder.query({
      query: () => "/categories/getSubCategory",
    }),

    // *********************** Authentication ********************
    createUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),

    emailVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/resendOTP",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetProductByIDQuery,
  useFilteredProductsQuery,
  useGetSubCategoryQuery,
  useCreateUserMutation,
  useEmailVerifyMutation,
  useResendOTPMutation,
} = apiSlice;
export default apiSlice;
