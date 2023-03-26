import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import good from './slices/goodSlice';
import goodId from './slices/goodIdSlice';
export const store = configureStore({
  reducer: {
    filter,
    cart,
    good,
    goodId,
  },
});
