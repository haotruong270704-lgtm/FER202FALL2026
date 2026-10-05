import { useCart } from "../contexts/CartContext";

export default function CartView() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, totalPrice, totalCount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: "16px", border: "1px solid #ccc" }}>
        <h2>🛒 Giỏ hàng</h2>
        <p>Giỏ hàng đang trống.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc" }}>
      <h2>🛒 Giỏ hàng ({totalCount} sản phẩm)</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString("vi-VN")} đ</td>
              <td>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </td>
              <td>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Tổng tiền: {totalPrice.toLocaleString("vi-VN")} đ</h3>
        <button onClick={clearCart} style={{ background: "red", color: "white", padding: "8px 16px" }}>
          Xóa toàn bộ giỏ hàng
        </button>
      </div>
    </div>
  );
}