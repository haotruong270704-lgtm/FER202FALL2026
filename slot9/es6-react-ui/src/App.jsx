// src/App.jsx
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import QuantityCart from './components/QuantityCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import RegisterFormBasic from './components/RegisterFormBasic';
import RegisterFormValidation from './components/RegisterFormValidation';
import TodoList from './components/TodoList';
import CartReducer from './components/CartReducer';
import LoginFormReducer from './components/LoginFormReducer';
import ThemeAuthContext from './components/ThemeAuthContext'; // Bài 9
import { ThemeProvider, AuthProvider } from './context/AppContexts';

function AppContent() {
  const [activeTab, setActiveTab] = useState('bai9');

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Tổng hợp Bài tập React Hooks</h2>
      
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="mb-4">
        <Nav.Item><Nav.Link eventKey="bai1">Bài 1</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai2">Bài 2</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai3">Bài 3</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai4">Bài 4</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai5">Bài 5</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai6">Bài 6</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai7">Bài 7</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai8">Bài 8</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="bai9">Bài 9 (Mới)</Nav.Link></Nav.Item>
      </Nav>

      {activeTab === 'bai1' && <QuantityCart />}
      {activeTab === 'bai2' && <ProfilePreview />}
      {activeTab === 'bai3' && <ProductFilter />}
      {activeTab === 'bai4' && <RegisterFormBasic />}
      {activeTab === 'bai5' && <RegisterFormValidation />}
      {activeTab === 'bai6' && <TodoList />}
      {activeTab === 'bai7' && <CartReducer />}
      {activeTab === 'bai8' && <LoginFormReducer />}
      {activeTab === 'bai9' && <ThemeAuthContext />}
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;