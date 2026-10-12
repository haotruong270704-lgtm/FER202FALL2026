import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';

export const CourseListPage = () => (
  <Container className="py-4">
    <h2>Danh sách môn học</h2>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Mã môn</th>
          <th>Tên môn</th>
          <th>Số tín chỉ</th>
        </tr>
      </thead>
      <tbody>
        {COURSES.map((c) => (
          <tr key={c.code}>
            <td>
              <Link to={`/courses/${c.code}`}>{c.code}</Link>
            </td>
            <td>{c.name}</td>
            <td>{c.credits}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);