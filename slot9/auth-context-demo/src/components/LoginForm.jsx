import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Vui lòng nhập tên đăng nhập!");
    login(username, role);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      <h3>🔑 Đăng nhập</h3>
      <div style={{ marginBottom: "8px" }}>
        <label>Tên đăng nhập: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập tên..."
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>Vai trò: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User (Thành viên)</option>
          <option value="admin">Admin (Quản trị viên)</option>
        </select>
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  );
}