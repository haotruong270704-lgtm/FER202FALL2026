// src/bai4/Bai4.jsx
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

const EventPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-4">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>FPTU Tech Day 2026</Card.Title>
          <Card.Text>Sự kiện công nghệ thường niên lớn nhất dành cho sinh viên FPT.</Card.Text>
          <Button variant="primary" onClick={() => navigate('/register')}>Đăng ký ngay</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', session: 'Sáng' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Họ tên không được để trống');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }
    setError('');
    navigate('/success', { state: { ...form, name: form.name.trim() }, replace: true });
  };

  return (
    <Container className="py-4" style={{ maxWidth: '500px' }}>
      <h2>Đăng ký tham dự</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={form.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Buổi tham dự</Form.Label>
          <Form.Select name="session" value={form.session} onChange={handleChange}>
            <option value="Sáng">Sáng</option>
            <option value="Chiều">Chiều</option>
          </Form.Select>
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
          <Button variant="primary" type="submit">Gửi đăng ký</Button>
        </div>
      </Form>
    </Container>
  );
};

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) return <Navigate to="/register" replace />;

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <Alert variant="success">
        <h4>Đăng ký thành công!</h4>
        <p>Cảm ơn <strong>{data.name}</strong>, vé đã gửi tới email <strong>{data.email}</strong> cho buổi {data.session}.</p>
      </Alert>
      <div className="d-flex gap-2">
        <Button variant="outline-primary" onClick={() => navigate('/register')}>Đăng ký thêm người khác</Button>
        <Button variant="primary" onClick={() => navigate('/')}>Về trang sự kiện</Button>
      </div>
    </Container>
  );
};

export default function Bai4() {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}