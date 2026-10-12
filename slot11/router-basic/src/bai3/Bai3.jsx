// src/bai3/Bai3.jsx
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { Container, Table, Card, Button, Alert } from 'react-bootstrap';

const COURSES = [
  { code: 'PRF192', name: 'Programming Fundamentals', credits: 3, semester: 1, desc: 'Cơ bản về tư duy lập trình với C.' },
  { code: 'WED201c', name: 'Web Design', credits: 3, semester: 2, desc: 'Thiết kế trang web chuẩn HTML/CSS/JS.' },
  { code: 'PRO192', name: 'Object-Oriented Programming', credits: 3, semester: 2, desc: 'Lập trình hướng đối tượng với Java.' },
  { code: 'FER202', name: 'Front-End Web Development with React', credits: 3, semester: 4, desc: 'Xây dựng Web SPA với React.' },
  { code: 'SWP391', name: 'Software Development Project', credits: 5, semester: 5, desc: 'Dự án thực tế làm việc theo nhóm.' },
];

const CourseListPage = () => (
  <Container className="py-4">
    <h2>Danh sách môn học</h2>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr><th>Mã môn</th><th>Tên môn</th><th>Số tín chỉ</th></tr>
      </thead>
      <tbody>
        {COURSES.map((c) => (
          <tr key={c.code}>
            <td><Link to={`/courses/${c.code}`}>{c.code}</Link></td>
            <td>{c.name}</td>
            <td>{c.credits}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

const CourseDetailPage = () => {
  const { code } = useParams();
  const course = COURSES.find((c) => c.code.toLowerCase() === code?.toLowerCase());

  if (!course) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Không tìm thấy môn học có mã {code}</Alert>
        <Button as={Link} to="/courses" variant="secondary">Quay lại danh sách</Button>
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
          <Button as={Link} to="/courses" variant="outline-primary">← Quay lại danh sách</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default function Bai3() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />
      <Route path="/courses" element={<CourseListPage />} />
      <Route path="/courses/:code" element={<CourseDetailPage />} />
    </Routes>
  );
}