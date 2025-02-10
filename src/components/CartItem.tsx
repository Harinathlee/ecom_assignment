import React from "react";
import { CartItem } from "../types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

/**
 * Interface for CartItemComponent props.
 */
interface CartItemProps {
  /**
   * The product to be displayed in the cart item.
   */
  product: CartItem;
}

/**
 * A React functional component that displays a cart item.
 */
const CartItemComponent: React.FC<CartItemProps> = ({ product }) => {
  // Get the current theme from the Redux store
  const theme = useSelector((state: RootState) => state.theme);

  return (
    /**
     * The container element for the cart item.
     */
    <div
      className={`flex items-center p-2 border border-${
        theme.theme === "dark" ? "gray-700" : "gray-200"
      } rounded-lg shadow-md mb-2 bg-${
        theme.theme === "dark" ? "gray-800" : "white"
      }`}
    >
      {/**
       * The product image.
       */}
      <img
        src={product.image}
        alt={product.title}
        className="w-12 h-12 mr-2 object-cover rounded-lg"
      />
      {/**
       * The product title container.
       */}
      <div className="flex-grow">
        {/**
         * The product title.
         */}
        <p
          className={`text-sm font-bold text-${
            theme.theme === "dark" ? "gray-200" : "gray-800"
          }`}
        >
          {product.title}
        </p>
      </div>
     { /**
       * The product quantity and price container.
       */}
      <div
        className={`text-sm text-${
          theme.theme === "dark" ? "gray-400" : "gray-600"
        }`}
      >
        {/**
         * The product quantity.
         */}
        <p>Qty: {product.quantity}</p>
        {/**
         * The product price and total.
         */}
        <p>
          ₹{product.price} x {product.quantity} = ₹
          {product.price * product.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItemComponent;