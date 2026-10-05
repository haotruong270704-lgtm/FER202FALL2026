import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

// Tách thành 2 Context riêng biệt theo đúng hướng dẫn giáo viên
const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// Hook đọc State (cho Badge, CartView)
export function useCart() {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error("useCart phải được dùng trong <CartProvider>");
  }
  return context;
}

// Hook đọc Dispatch (cho ProductList - không bị re-render thừa)
export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error("useCartDispatch phải được dùng trong <CartProvider>");
  }
  return context;
}