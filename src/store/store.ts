// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import apiReducer, { apiSlice } from '../store/apiSlice';
import themeReducer from './themeSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiReducer,
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

