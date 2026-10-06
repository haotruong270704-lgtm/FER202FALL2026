// src/App.jsx
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

// Import lại tất cả component bài 1-5 bạn đã tạo
import QuantityCart from './components/QuantityCart'; // Bài 1 (ví dụ tên component của bạn)
import ProfilePreview from './components/ProfilePreview'; // Bài 2
import ProductFilter from './components/ProductFilter'; // Bài 3
import RegisterFormBasic from './components/RegisterFormBasic'; // Bài 4
import RegisterFormValidation from './components/RegisterFormValidation'; // Bài 5
import TodoList from './components/TodoList'; // Bài 6 vừa làm

function App() {
  const [activeTab, setActiveTab] = useState('bai6');

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Tổng hợp Bài tập React Hooks</h2>
      
      {/* Thanh Menu chọn bài */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="mb-4">
        <Nav.Item><Nav.Link eventKey="bai1">Bài 1</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai2">Bài 2</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai3">Bài 3</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai4">Bài 4</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai5">Bài 5</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai6">Bài 6 (Mới)</Nav.Link></Nav.Item>
      </Nav>

      {/* Hiển thị bài tập tương ứng */}
      {activeTab === 'bai1' && <QuantityCart />}
      {activeTab === 'bai2' && <ProfilePreview />}
      {activeTab === 'bai3' && <ProductFilter />}
      {activeTab === 'bai4' && <RegisterFormBasic />}
      {activeTab === 'bai5' && <RegisterFormValidation />}
      {activeTab === 'bai6' && <TodoList />}
    </Container>
  );
}

export default App;