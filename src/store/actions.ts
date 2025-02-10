import { createAction } from "@reduxjs/toolkit";
import { Product } from "../types";

// actions.ts
export const addProduct = (product:Product) => {
    return {
      type: 'ADD_PRODUCT',
      product,
    };
  };
  
  export const removeProduct = (productId:number) => {
    return {
      type: 'REMOVE_PRODUCT',
      productId,
    };
  };
  
  export const toggleTheme = () => {
    return {
      type: 'TOGGLE_THEME',
    };
  };

  export const clearCart = createAction('cart/clearCart');