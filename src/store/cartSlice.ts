import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for a product.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

/**
 * Interface for a cart item, extending the Product interface.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Interface for the cart state.
 */
interface CartState {
  items: CartItem[];
  totalValue: number;
}

/**
 * Initial state of the cart.
 */
const initialState: CartState = {
  items: [],
  totalValue: 0,
};

/**
 * Slice for cart management.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds an item to the cart.
     * If the item already exists, increments its quantity.
     */
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalValue += action.payload.price;
      } else {
        state.items.push(action.payload);
        state.totalValue += action.payload.price * action.payload.quantity;
      }
    },
    
    /**
     * Clears the cart.
     */
    clearCart: (state) => {
      state.items = [];
      state.totalValue = 0;
    },
    /**
     * Sets the cart items and total value.
     * Can accept either a single item or an array of items.
     */
    setCart: (state, action: PayloadAction<CartItem[] | CartItem>) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.totalValue = action.payload.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      } else {
        state.items = [action.payload];
        state.totalValue = action.payload.price * action.payload.quantity;
      }
    },
  },
});

/**
 * Exports the cart actions.
 */
export const { addItem, clearCart, setCart } = cartSlice.actions;

/**
 * Exports the cart reducer.
 */
export default cartSlice.reducer;