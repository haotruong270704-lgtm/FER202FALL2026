import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container className="py-4 text-center">
      <h1>Chào mừng đến với Portfolio của tôi</h1>
      <p>Tôi là một lập trình viên Frontend đam mê công nghệ.</p>
      <Button as={Link} to="/projects" variant="primary">Xem dự án của mình</Button>
    </Container>
  );
}