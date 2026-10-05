export const initialCartState = {
  cart: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        return { ...state, cart: updatedCart };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "INCREASE_QTY": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: updatedCart };
    }

    case "DECREASE_QTY": {
      const updatedCart = state.cart
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return { ...state, cart: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}