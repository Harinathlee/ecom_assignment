import { CartItem } from "../types";

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const getTotalAmount = (cartItems: CartItem[]) => {
  const totalAmount = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );
  return totalAmount;
};
