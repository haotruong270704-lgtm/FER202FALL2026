import ProductList from "./components/ProductList";
import CartView from "./components/CartView";

export default function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>Shopping Cart Demo (Context + Reducer)</h1>
      <ProductList />
      <CartView />
    </div>
  );
}