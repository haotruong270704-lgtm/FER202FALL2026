import { useCart, useCartDispatch } from "../contexts/CartContext";

export default function CartView() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                <button onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}>-</button>
                <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                <button onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}>+</button>
              </td>
              <td>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</td>
              <td>
                <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Tổng tiền: {totalPrice.toLocaleString("vi-VN")} đ</h3>
        <button 
          onClick={() => dispatch({ type: "CLEAR_CART" })} 
          style={{ background: "red", color: "white", padding: "8px 16px" }}
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </div>
    </div>
  );
}