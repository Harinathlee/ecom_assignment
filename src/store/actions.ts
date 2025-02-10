import { createAction } from "@reduxjs/toolkit";
import { Product } from "../types";

// actions.ts
/**
 * Action to add a product to the cart.
 * @param product - The product to be added.
 */
export const addProduct = (product: Product) => {
  return {
    type: "ADD_PRODUCT",
    product,
  };
};

/**
 * Action to remove a product from the cart.
 * @param productId - The ID of the product to be removed.
 */
export const removeProduct = (productId: number) => {
  return {
    type: "REMOVE_PRODUCT",
    productId,
  };
};

/**
 * Action to toggle the theme.
 */
export const toggleTheme = () => {
  return {
    type: "TOGGLE_THEME",
  };
};

export const setTheme = (theme: string) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};
/**
 * Action to clear the cart.
 */
export const clearCart = createAction("cart/clearCart");