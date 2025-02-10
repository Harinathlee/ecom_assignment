// Import necessary dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
import { addItem, CartItem, clearCart } from '../store/cartSlice';
import CartItemComponent from './CartItem';
import CheckoutForm from './CheckoutForm';

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
  useEffect(() => {
    // Restore cart from localStorage
    const savedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      savedCart.forEach((product: CartItem) => {
        // Add each product to the cart using the addItem action
        dispatch(addItem(product));
      });
    }
  }, [dispatch]); // Re-run the effect when the dispatch function changes

  /**
   * Handle the checkout process
   * 
   * @param orderDetails - Order details
   */
  const handleCheckout = (orderDetails: { name: string; email: string; phone: string; address: string }) => {
    // Save order details to localStorage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Clear cart and redirect to home page
    dispatch(clearCart());
    window.location.href = '/';
  };

  // Return the JSX for the CartPage component
  return (
    // Use the theme prop to conditionally apply dark or light mode styles
    <div
      className={`h-screen w-screen mx-auto p-4 md:p-6 lg:p-8 ${
        theme.theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-white text-gray-900'
      }`}
    >
   
      <h1
        className={`text-center text-3xl font-bold mb-4 ${
          theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        Your Cart
      </h1>

      
      <div
        className={`flex flex-col space-y-4 ${
          theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {products.map((product: CartItem) => (
          // Render each cart item using the CartItemComponent
          <CartItemComponent key={product.id} product={product} />
        ))}
      </div>

    
      <div
        className={`flex justify-end mt-4 ${
          theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        <h2
          className={`text-lg font-bold ${
            theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Total: ₹{totalValue}
        </h2>
      </div>

  
      <div
        className={`mt-8 ${
          theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        <CheckoutForm onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

// Export the CartPage component
export default CartPage;