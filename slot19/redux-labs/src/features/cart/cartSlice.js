import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart() {
      return { items: [] };
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);