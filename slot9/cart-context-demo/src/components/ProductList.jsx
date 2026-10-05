import { PRODUCTS } from "../data/products";
import { useCart } from "../contexts/CartContext";

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", marginBottom: "16px" }}>
      <h2>📦 Danh sách Sản phẩm</h2>
      <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {PRODUCTS.map((prod) => (
          <div key={prod.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>
            <h4>{prod.name}</h4>
            <p>Giá: {prod.price.toLocaleString("vi-VN")} đ</p>
            <button onClick={() => addToCart(prod)}>Thêm vào giỏ</button>
          </div>
        ))}
      </div>
    </div>
  );
}