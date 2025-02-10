// apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Creates an API slice for interacting with the Fake Store API.
 */
export const apiSlice = createApi({
  /**
   * The reducer path for the API slice.
   */
  reducerPath: "api",
  /**
   * The base query for the API slice, using the fetchBaseQuery from @reduxjs/toolkit/query/react.
   */
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  /**
   * The tag types for the API slice, used for caching and invalidation.
   */
  tagTypes: ["Product"],
  /**
   * The endpoints for the API slice, defined using the builder function.
   */
  endpoints: (builder) => ({
    /**
     * Retrieves a list of products from the API.
     */
    getProducts: builder.query({
      query: () => "/products",
    }),
    
  }),
});

/**
 * Exports the useGetProductsQuery hook from the API slice.
 */
export const { useGetProductsQuery } = apiSlice;
/**
 * Exports the reducer for the API slice.
 */
export default apiSlice.reducer;