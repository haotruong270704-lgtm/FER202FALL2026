// src/App.jsx
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// --- Khai báo import ĐÚNG TÊN FILE trong thư mục components ---
import QuantityCart from "./components/QuantityCart";
import UserTable from "./components/UserTable";
import ProductFilter from "./components/ProductFilter";
import RegisterForm from "./components/RegisterForm";
import TodoList from "./components/TodoList";
import CartReducer from "./components/CartReducer";
import LoginFormReducer from "./components/LoginFormReducer";
import ThemeAuthContext from "./components/ThemeAuthContext";
import MiniShop from "./components/MiniShop";

import { ThemeProvider, AuthProvider } from "./context/AppContexts";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const [activeTab, setActiveTab] = useState("bai1");

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Tổng hợp Bài tập React Hooks</h2>

      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
        className="mb-4"
      >
        <Nav.Item><Nav.Link eventKey="bai1">Bài 1 (Quantity Cart)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai2">Bài 2 (User Table)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai3">Bài 3 (Product Filter)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai4">Bài 4 & 5 (Register Form)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai6">Bài 6 (Todo List)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai7">Bài 7 (Cart Reducer)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai8">Bài 8 (Login Reducer)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai9">Bài 9 (Theme & Auth)</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai10">Bài 10 (Mini Shop)</Nav.Link></Nav.Item>
      </Nav>

      {/* Hiển thị component tương ứng */}
      {activeTab === "bai1" && <QuantityCart />}
      {activeTab === "bai2" && <UserTable />}
      {activeTab === "bai3" && <ProductFilter />}
      {activeTab === "bai4" && <RegisterForm />}
      {activeTab === "bai6" && <TodoList />}
      {activeTab === "bai7" && <CartReducer />}
      {activeTab === "bai8" && <LoginFormReducer />}
      {activeTab === "bai9" && <ThemeAuthContext />}
      {activeTab === "bai10" && <MiniShop />}
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;