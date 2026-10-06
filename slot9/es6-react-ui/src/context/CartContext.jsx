// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += 1;
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'INCREASE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const increase = (id) => dispatch({ type: 'INCREASE', payload: id });
  const decrease = (id) => dispatch({ type: 'DECREASE', payload: id });
  const remove = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider
      value={{ cart, totalPrice, totalQuantity, addToCart, increase, decrease, remove, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);