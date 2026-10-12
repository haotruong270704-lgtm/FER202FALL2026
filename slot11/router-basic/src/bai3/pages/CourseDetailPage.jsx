import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { findCourse } from '../data/courses';

export const CourseDetailPage = () => {
  const { code } = useParams();
  const course = findCourse(code);

  if (!course) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Không tìm thấy môn học có mã {code}</Alert>
        <Button as={Link} to="/courses" variant="secondary">
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '600px' }}>
        <Card.Header as="h5">{course.code} - {course.name}</Card.Header>
        <Card.Body>
          <Card.Text><strong>Học kỳ:</strong> {course.semester}</Card.Text>
          <Card.Text><strong>Số tín chỉ:</strong> {course.credits}</Card.Text>
          <Card.Text><strong>Mô tả:</strong> {course.desc}</Card.Text>
          <Button as={Link} to="/courses" variant="outline-primary">
            ← Quay lại danh sách
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};