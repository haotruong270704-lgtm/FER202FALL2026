import { useAuth } from "../contexts/AuthContext";

export default function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return null; // Không hiển thị nếu không phải admin
  }

  return (
    <div style={{ marginTop: "16px", border: "1px solid #ff9800", padding: "16px", borderRadius: "8px", background: "#fff3e0" }}>
      ⚙️ <b>Khu vực Quản trị viên (Admin Panel)</b>
      <p>Chỉ tài khoản có quyền Admin mới thấy nội dung này.</p>
    </div>
  );
}