import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Đường dẫn bạn truy cập không đúng.</p>
      <Button as={Link} to="/" variant="secondary">Về trang chủ</Button>
    </Container>
  );
}