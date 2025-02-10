// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import apiReducer, { apiSlice } from "../store/apiSlice";
import themeReducer from "./themeSlice";


// Create the Redux store with the combined reducers and middleware
export const store = configureStore({
  // Define the reducers for the store
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiReducer,
    theme: themeReducer,
  
  },
  // Add the middleware for the store
  middleware: (getDefaultMiddleware) =>
    // Concatenate the default middleware with the API middleware
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Define the types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;