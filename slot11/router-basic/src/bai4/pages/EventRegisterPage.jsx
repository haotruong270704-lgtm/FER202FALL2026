import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { findEventById } from '../data/events';

export const EventRegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('eventId');
  const event = findEventById(eventId);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tickets: 1,
  });

  if (!event) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          Vui lòng chọn một sự kiện hợp lệ từ danh sách để đăng ký.
        </Alert>
        <Button as={Link} to="/events" variant="secondary">
          Quay lại danh sách sự kiện
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển sang trang xác nhận và truyền dữ liệu qua location.state
    navigate('/events/confirmation', {
      state: {
        registration: formData,
        event: event,
      },
    });
  };

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '600px' }} className="mx-auto shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Đăng ký: {event.title}</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted small mb-3">
            📅 Ngày: {event.date} | 📍 {event.location}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên *</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                required
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="example@fpt.edu.vn"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                required
                placeholder="0912345678"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Số lượng vé</Form.Label>
              <Form.Select
                name="tickets"
                value={formData.tickets}
                onChange={handleChange}
              >
                <option value={1}>1 vé</option>
                <option value={2}>2 vé</option>
                <option value={3}>3 vé</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button as={Link} to="/events" variant="outline-secondary">
                Hủy bỏ
              </Button>
              <Button type="submit" variant="success">
                Xác nhận Đăng ký
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};