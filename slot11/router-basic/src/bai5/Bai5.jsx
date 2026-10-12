// src/bai5/Bai5.jsx
import { useSearchParams } from 'react-router-dom';
import { Container, Form, Table, Button, Row, Col } from 'react-bootstrap';

const STUDENTS = [
  { id: 'SE180001', name: 'Phạm Minh Anh', className: 'SE20B01', gpa: 3.5 },
  { id: 'SE180002', name: 'Nguyễn Văn Bình', className: 'SE20B02', gpa: 3.2 },
  { id: 'SE180003', name: 'Võ Thanh Dũng', className: 'SE20B02', gpa: 3.8 },
  { id: 'SE180004', name: 'Đỗ Ngọc Hân', className: 'SE20B04', gpa: 3.9 },
  { id: 'SE180005', name: 'Trần Hoàng Long', className: 'SE20B01', gpa: 2.8 },
  { id: 'SE180006', name: 'Lê Thị Mai', className: 'SE20B04', gpa: 3.6 },
];

export default function Bai5() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const className = searchParams.get('class') ?? '';

  const updateParam = (key, value, replace = false) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace });
  };

  const filteredStudents = STUDENTS.filter((s) => {
    const matchQ = s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase());
    const matchClass = className ? s.className === className : true;
    return matchQ && matchClass;
  });

  return (
    <Container className="py-4">
      <h2>Danh bạ sinh viên</h2>
      <Row className="mb-3 g-2">
        <Col md={5}>
          <Form.Control
            placeholder="Tìm theo tên hoặc MSSV..."
            value={q}
            onChange={(e) => updateParam('q', e.target.value, true)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={className}
            onChange={(e) => updateParam('class', e.target.value)}
          >
            <option value="">Tất cả lớp</option>
            <option value="SE20B01">SE20B01</option>
            <option value="SE20B02">SE20B02</option>
            <option value="SE20B04">SE20B04</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" className="w-100" onClick={() => setSearchParams({})}>
            Xóa lọc
          </Button>
        </Col>
      </Row>

      <p className="fw-bold">Tìm thấy {filteredStudents.length}/6 sinh viên</p>

      <Table striped bordered hover>
        <thead>
          <tr><th>MSSV</th><th>Họ tên</th><th>Lớp</th><th>GPA</th></tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.className}</td>
                <td>{s.gpa}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={4} className="text-center">Không có sinh viên phù hợp.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}