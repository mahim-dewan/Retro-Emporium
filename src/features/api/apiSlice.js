import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}`,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    // *********************** PRODUCT ********************

    getProducts: builder.query({
      query: () => `/products`,
      providesTags: ["products"],
    }),

    getProductByID: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),

    filteredProducts: builder.query({
      query: ({ category, minPrice, maxPrice }) =>
        `/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "products", id },
        "products",
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "/products",
        method: "DELETE",
        body: JSON.stringify(id),
      }),
      invalidatesTags: ["products"],
    }),

    // *********************** Category ********************
    getCategories: builder.query({
      query: () => "/categories/getCategories",
    }),
    getCategory: builder.query({
      query: (id) => `/categories/getCategories/${id}`,
    }),

    getSubCategories: builder.query({
      query: () => `/categories/getSubCategories/`,
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
  useGetProductsQuery,
  useGetProductByIDQuery,
  useFilteredProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetSubCategoriesQuery,
  useCreateUserMutation,
  useEmailVerifyMutation,
  useResendOTPMutation,
} = apiSlice;
export default apiSlice;
