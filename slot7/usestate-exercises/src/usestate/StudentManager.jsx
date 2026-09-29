import React, { useState } from 'react';
import { Card, Table, Form, Button, Badge, Row, Col } from 'react-bootstrap';

const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'];

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6.0, contact: { city: 'TP.HCM' } },
];

function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const addStudent = (e) => {
    e.preventDefault();
    if (newName.trim().length < 3) return;

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        score: 0,
        contact: { city: CITIES[0] },
      },
    ]);
    setNewName('');
  };

  const updateScore = (id, text) => {
    const score = Math.min(10, Math.max(0, Number(text) || 0));
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score } : s))
    );
  };

  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, contact: { ...s.contact, city } } : s
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, s.score + 0.5),
      }))
    );
  };

  const sorted = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi');
    if (sortBy === 'score') return b.score - a.score;
    return 0;
  });

  const average = students.length > 0
    ? (students.reduce((sum, s) => sum + s.score, 0) / students.length).toFixed(2)
    : '0.00';

  const passed = students.filter((s) => s.score >= 5).length;

  return (
    <Card className="mb-4 shadow">
      <Card.Header as="h4" className="bg-warning text-dark">
        Adv 4: Quản Lý Điểm Sinh Viên
      </Card.Header>
      <Card.Body>
        <Form onSubmit={addStudent} className="mb-4">
          <Row className="g-2">
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Họ và tên (ít nhất 3 ký tự)..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Button type="submit" variant="primary" className="w-100" disabled={newName.trim().length < 3}>
                Thêm sinh viên
              </Button>
            </Col>
            <Col md={2}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="none">Thứ tự nhập</option>
                <option value="name">Tên A → Z</option>
                <option value="score">Điểm cao → thấp</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant="outline-success" className="w-100" onClick={bonusAll}>
                +0.5 cả lớp
              </Button>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Điểm (0-10)</th>
              <th>Thành phố</th>
              <th>Kết quả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td className="fw-bold">{s.name}</td>
                <td style={{ width: '120px' }}>
                  <Form.Control
                    type="number"
                    step="0.5"
                    value={s.score}
                    onChange={(e) => updateScore(s.id, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Select
                    value={s.contact.city}
                    onChange={(e) => updateCity(s.id, e.target.value)}
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Badge bg={s.score >= 5 ? 'success' : 'danger'}>
                    {s.score >= 5 ? 'Đạt' : 'Chưa đạt'}
                  </Badge>
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeStudent(s.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="fw-bold text-center mt-3 fs-5 text-secondary">
          Sĩ số: {students.length} · Điểm trung bình: {average} · Đạt: {passed}/{students.length}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StudentManager;