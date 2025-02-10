import React from "react";
import { useSelector } from "react-redux";
import { Product } from "../types";
import ProductCard from "../layout/ProductCard";
import { RootState } from "../store/store";
import { useGetProductsQuery } from "../store/apiSlice";

// ProductsList component
const ProductsList = () => {
  // Access the theme state from the Redux store
  const theme = useSelector((state: unknown) => state as RootState).theme;
  // Fetch products data, handle loading and error states
  const { data, error, isLoading } = useGetProductsQuery({});

  // Show loading state while fetching products
  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme.theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        Loading...
      </div>
    );
  }

  // Show error state if there's an error fetching products
  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme.theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        Error:
      </div>
    );
  }

  // Render the list of product cards if data is available
  return (
    <div
      className={`flex flex-wrap justify-center gap-6 p-6 ${
        theme.theme === "light" ? "bg-gray-200" : "bg-gray-900"
      }`}
    >
      {/* Map over the product data and render a ProductCard for each product */}
      {data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
