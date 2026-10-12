import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Đọc đường dẫn người dùng muốn vào trước đó (mặc định là /profile)
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Đăng nhập thất bại!');
    }
  };

  return (
    <Container className="py-5">
      <Card style={{ maxWidth: '450px' }} className="mx-auto shadow-sm">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0">Đăng nhập Hệ thống</h4>
        </Card.Header>
        <Card.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username (ví dụ: admin hoặc student)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu bất kỳ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mb-3">
              Đăng nhập
            </Button>
            <div className="text-center">
              <Link to="/" className="text-decoration-none text-muted small">
                ← Quay lại Trang chủ
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};