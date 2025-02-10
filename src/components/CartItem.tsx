import React from 'react';
import { CartItem } from '../store/cartSlice';
interface CartItemProps {
  product: CartItem;
}
const CartItemComponent: React.FC<CartItemProps> = ({ product }) => {
  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-md mb-4">
      <div className="w-24 h-24 mr-4">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex-grow">
        <h4 className="text-lg font-bold mb-2">{product.title}</h4>
        <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
        <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
        <p className="text-gray-600">Total: ₹{product.price * product.quantity}</p>
      </div>
    </div>
  );
};

export default CartItemComponent;