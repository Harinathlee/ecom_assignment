// Import necessary dependencies
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { addItem, clearCart } from "../store/cartSlice";
import CartItemComponent from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { CartItem } from "../types";
import { getCartItems } from "../utilities/CartUtils";

/**
 * CartPage component
 *
 * This component displays the cart items and total value.
 * It also handles the checkout process.
 */
const CartPage: React.FC = () => {
  // Get the dispatch function from the Redux store
  const dispatch: AppDispatch = useDispatch();

  // Get the products and total value from the Redux store
  const products = useSelector((state: RootState) => state.cart.items);
  const totalValue = useSelector((state: RootState) => state.cart.totalValue);

  // Get the current theme from the Redux store
  const theme = useSelector((state: RootState) => state.theme);

  /**
   * Restore cart from localStorage when the component mounts
   */
  // Get the saved cart items from localStorage
  const savedCart: CartItem[] = getCartItems();
  console.log("saved cart", savedCart);

  // Use the useEffect hook to restore the cart when the component mounts
  useEffect(() => {
    // Check if there are saved cart items
    if (savedCart.length > 0) {
      // Add each saved cart item to the Redux store
      savedCart.forEach((product: CartItem) => {
        // Dispatch the addItem action to add the product to the cart
        dispatch(addItem(product));
      });
    }
  }, [dispatch]); // Re-run the effect when the dispatch function changes

  /**
   * Handle the checkout process
   *
   * @param orderDetails - Order details
   */
  const handleCheckout = (orderDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    // Save the order details to localStorage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    // Remove the cart from localStorage
    localStorage.removeItem("cart");
    // Clear the cart and redirect to the home page
    dispatch(clearCart());
    window.location.href = "/";
  };

  // Return the JSX for the CartPage component
  return (
    // Use the theme prop to conditionally apply dark or light mode styles
    <div
      className={`h-screen w-screen mx-auto p-4 md:p-6 lg:p-8 ${
        theme.theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <h1
        className={`text-center text-3xl font-bold mb-4 ${
          theme.theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Your Cart
      </h1>

      <div
        className={`flex flex-col space-y-4 ${
          theme.theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {/* Render the cart items */}
        {(products.length > 0 ? products : getCartItems().items).map(
          (product: CartItem) => (
            // Render each cart item using the CartItemComponent
            <CartItemComponent key={product.id} product={product} />
          )
        )}
      </div>

      <div
        className={`flex justify-end mt-4 ${
          theme.theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <h2
          className={`text-lg font-bold ${
            theme.theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {/* Display the total value */}
          Total: ₹{totalValue > 0 ? totalValue : getCartItems().totalValue}
        </h2>
      </div>

      <div
        className={`mt-8 ${
          theme.theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {/* Render the checkout form */}
        <CheckoutForm onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

// Export the CartPage component
export default CartPage;