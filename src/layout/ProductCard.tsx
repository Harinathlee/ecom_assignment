import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Product } from "../types";
import { RootState } from "../store/store";
import { addItem, CartItem } from "../store/cartSlice";

// Define the props for ProductCard component
interface ProductCardProps {
  product: Product;
}

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Access the theme state from the Redux store
  const theme = useSelector((state: unknown) => state as RootState).theme;
  const dispatch = useDispatch();

  // Function to handle adding product to cart
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = { ...product, quantity: 1 };
    dispatch(addItem(cartItem));
  };

  return (
    // Container for the product card with dynamic styling based on the theme
    <div
      className={`flex flex-col p-4 ${
        theme.theme === "light"
          ? "bg-white border border-gray-200 shadow-md shadow-slate-500"
          : "bg-gray-800 border border-gray-700 shadow-md shadow-slate-900"
      } rounded-lg transition duration-300 ease-in-out lg:w-1/4 md:w-1/2 sm:w-full xs:w-full h-96 m-4`}
    >
      {/* Product image */}
      <img
        src={product.image}
        alt={product.title}
        className="object-cover w-full h-64 rounded-t-lg"
      />
      {/* Product title */}
      <h2
        className={`flex-1 mt-4 overflow-hidden font-bold leading-8 ${
          theme.theme === "light" ? "text-gray-800" : "text-gray-200"
        } text-md`}
      >
        {product.title}
      </h2>
      {/* Product price and add to cart button */}
      <div className="flex justify-between mt-auto">
        <p
          className={`text-lg ${
            theme.theme === "light" ? "text-gray-800" : "text-gray-200"
          }`}
        >
          ${product.price}
        </p>
        <button
          className={`px-4 py-2 font-bold text-white ${
            theme.theme === "light"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-700 hover:bg-blue-800"
          } rounded`}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
