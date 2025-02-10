import React from 'react';
import { Product } from '../types';

interface CartItemProps {
  product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <div>
      <p>{product.title} - ₹{product.price}</p>
    </div>
  );
};

export default CartItem;
