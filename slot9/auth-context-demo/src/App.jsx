import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>🔐 App AuthContext Demo</h2>
      {!isAuthenticated ? (
        <LoginForm />
      ) : (
        <>
          <UserProfile />
          <AdminPanel />
        </>
      )}
    </div>
  );
}