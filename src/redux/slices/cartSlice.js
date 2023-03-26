import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.items.reduce((acc, item) => (acc += item.price * item.quantity), 0);
    },
    removeItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.quantity > 1) {
        findItem.quantity--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      state.totalPrice = state.items.reduce((acc, item) => (acc += item.price * item.quantity), 0);
    },
    clearItems(state) {
      state.items = initialState.items;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

export const cartSelector = (state) => state.cart;
export const cartItemSelector = (id) => (state) => state.cart.items.find((item) => item.id === id);
export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
