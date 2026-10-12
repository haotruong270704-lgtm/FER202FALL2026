import { Container, Card, Button } from 'react-bootstrap';

export default function ProjectsPage() {
  const projects = ['Website Tin tức', 'E-commerce App', 'Portfolio Personal'];

  return (
    <Container className="py-4">
      <h2>Dự án tiêu biểu</h2>
      <div className="d-flex gap-3 mt-3 flex-wrap">
        {projects.map((title, idx) => (
          <Card style={{ width: '18rem' }} key={idx}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>Mô tả ngắn gọn về dự án {title}. Được xây dựng bằng ReactJS.</Card.Text>
              <Button variant="outline-primary" size="sm">Chi tiết</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}