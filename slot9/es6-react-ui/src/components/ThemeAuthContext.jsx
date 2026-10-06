// src/components/ThemeAuthContext.jsx
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useTheme, useAuth } from '../context/AppContexts';

const ThemeAuthContext = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    login(emailInput.trim());
    setEmailInput('');
  };

  const isDark = theme === 'dark';

  return (
    <Card
      className={`shadow-sm mx-auto my-4 ${
        isDark ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'
      }`}
      style={{ maxWidth: '500px' }}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Bài 9: Theme & Auth với useContext</h5>
        <Button
          variant={isDark ? 'warning' : 'dark'}
          size="sm"
          onClick={toggleTheme}
        >
          {isDark ? '☀️ Chế độ Sáng' : '🌙 Chế độ Tối'}
        </Button>
      </Card.Header>
      <Card.Body>
        {user ? (
          <Alert variant={isDark ? 'secondary' : 'info'}>
            <h5>Xin chào, {user.name}!</h5>
            <p className="mb-2">Email: <strong>{user.email}</strong></p>
            <p className="mb-3">
              Trạng thái giao diện hiện tại: <strong>{theme.toUpperCase()}</strong>
            </p>
            <Button variant="danger" size="sm" onClick={logout}>
              Đăng xuất
            </Button>
          </Alert>
        ) : (
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nhập Email để mô phỏng Đăng nhập:</Form.Label>
              <Form.Control
                type="email"
                placeholder="vd: student@fpt.edu.vn"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant={isDark ? 'light' : 'primary'} type="submit" className="w-100">
              Đăng nhập qua Context
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default ThemeAuthContext;