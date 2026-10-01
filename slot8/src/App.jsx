import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

// Import trực tiếp các Context từ cùng thư mục src/
import { ThemeProvider, useTheme } from './ThemeContext';
import { AuthProvider, useAuth } from './AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { state, logout } = useAuth();

  return (
    <Navbar bg={theme === 'dark' ? 'secondary' : 'primary'} variant="dark" expand="lg" className="rounded mb-4 px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#">Slot 8: Context API & useReducer</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <Button variant={theme === 'dark' ? 'warning' : 'light'} size="sm" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
          </Button>
          {state.isAuthenticated && (
            <div className="d-flex align-items-center gap-2">
              <span className="text-white">Xin chào, <strong>{state.user.name}</strong></span>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Đăng xuất
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

const Content = () => {
  const { state, login } = useAuth();
  const { theme } = useTheme();
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    login(inputName);
    setInputName('');
  };

  return (
    <Card className={`shadow-sm ${theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
      <Card.Header as="h5">Trạng Thái Hệ Thống</Card.Header>
      <Card.Body>
        {state.isAuthenticated ? (
          <div>
            <h4>
              Trạng thái: <Badge bg="success">Đã Đăng Nhập</Badge>
            </h4>
            <p className="mt-3">
              Tài khoản: <strong>{state.user.name}</strong> | Vai trò: <strong>{state.user.role}</strong>
            </p>
            <p className="text-muted">
              Dữ liệu này được truyền trực tiếp từ <code>AuthContext</code> tới component con mà không thông qua props!
            </p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nhập tên người dùng để đăng nhập:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ví dụ: NguyenVanA"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
              />
            </Form.Group>
            <Button variant={theme === 'dark' ? 'warning' : 'primary'} type="submit" disabled={!inputName.trim()}>
              Đăng nhập
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Container className="py-4">
          <Header />
          <Content />
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}