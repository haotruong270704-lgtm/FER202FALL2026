import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div style={{ border: "1px solid #4CAF50", padding: "16px", borderRadius: "8px", background: "#e8f5e9" }}>
      <h3>👤 Thông tin tài khoản</h3>
      <p>Xin chào, <b>{user.username}</b>!</p>
      <p>Vai trò: <span style={{ color: user.role === "admin" ? "red" : "blue", fontWeight: "bold" }}>{user.role}</span></p>
      <button onClick={logout} style={{ background: "#f44336", color: "#fff", border: "none", padding: "6px 12px", cursor: "pointer" }}>
        Đăng xuất
      </button>
    </div>
  );
}