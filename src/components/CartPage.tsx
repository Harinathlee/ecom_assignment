/* import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../types';
import { RootState } from '@reduxjs/toolkit/query';
import { AppDispatch } from '../store/store';
import { addItem, clearCart } from '../store/cartSlice';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const totalValue = products.reduce((sum:number, product:Product) => sum + product.price, 0);

  useEffect(() => {
    // Restore cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      savedCart.forEach((product: { id: number; name: string; price: number }) => {
        dispatch(addItem(product));
      });
    }
  }, [dispatch]);

  const handleCheckout = (orderDetails: { name: string; email: string; phone: string; address: string }) => {
    // Save order details to localStorage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Clear cart and redirect to home page
    dispatch(clearCart());
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {products.map((product: Product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <h2>Total: ₹{totalValue}</h2>
      <CheckoutForm onCheckout={handleCheckout} />
    </div>
  );
};

export default CartPage;
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
import { addItem, CartItem, clearCart } from '../store/cartSlice';
import CartItemComponent from './CartItem';
import CheckoutForm from './CheckoutForm';


const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.items);
  const totalValue = useSelector((state: RootState) => state.cart.totalValue);

  useEffect(() => {
    // Restore cart from localStorage
    const savedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      savedCart.forEach((product: CartItem) => {
        dispatch(addItem(product));
      });
    }
  }, [dispatch]);

  const handleCheckout = (orderDetails: { name: string; email: string; phone: string; address: string }) => {
    // Save order details to localStorage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Clear cart and redirect to home page
    dispatch(clearCart());
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {products.map((product: CartItem) => (
          <CartItemComponent key={product.id} product={product} />
        ))}
      </div>
      <h2>Total: ₹{totalValue}</h2>
      <CheckoutForm onCheckout={handleCheckout} />
    </div>
  );
};

export default CartPage;
