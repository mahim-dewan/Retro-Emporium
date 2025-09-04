import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}`,
  }),
  tagTypes: ["products", "categories", "auth"],

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
      query: ({ category, min_price, max_price }) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (min_price) params.append("min_price", min_price);
        if (max_price) params.append("max_price", max_price);
        return `/products?${params.toString()}`;
      },
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "PUT",
        body: data,
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
        body: id,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "products", id },
        "products",
      ],
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
        body: data,
      }),
    }),

    emailVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/resendOTP",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: data,
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
