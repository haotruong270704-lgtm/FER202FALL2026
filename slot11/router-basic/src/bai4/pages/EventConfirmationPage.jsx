import { useLocation, Link, Navigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Badge } from 'react-bootstrap';

export const EventConfirmationPage = () => {
  const location = useLocation();
  const state = location.state;

  // Nếu người dùng truy cập trực tiếp URL mà không qua Form
  if (!state || !state.registration || !state.event) {
    return <Navigate to="/events" replace />;
  }

  const { registration, event } = state;

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '650px' }} className="mx-auto shadow-sm border-success">
        <Card.Header className="bg-success text-white text-center py-3">
          <h4 className="mb-0">🎉 Đăng ký thành công!</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant="success">
            Cảm ơn <strong>{registration.fullName}</strong>! Thông tin xác nhận vé đã được gửi tới email <u>{registration.email}</u>.
          </Alert>

          <h5 className="border-bottom pb-2 mt-4">Thông tin vé tham dự</h5>
          <p><strong>Sự kiện:</strong> {event.title}</p>
          <p><strong>Thời gian:</strong> {event.date}</p>
          <p><strong>Địa điểm:</strong> {event.location}</p>
          <p><strong>Số lượng vé:</strong> <Badge bg="primary">{registration.tickets} vé</Badge></p>
          <p><strong>Số điện thoại liên hệ:</strong> {registration.phone}</p>

          <div className="text-center mt-4">
            <Button as={Link} to="/events" variant="primary">
              Quay lại danh sách Sự kiện
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};