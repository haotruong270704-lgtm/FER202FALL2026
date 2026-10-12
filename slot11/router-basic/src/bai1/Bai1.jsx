// src/bai1/Bai1.jsx
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, ListGroup, Card, Button } from 'react-bootstrap';

const HomePage = () => (
  <Container className="py-4 text-center">
    <h1>Chào mừng đến với Portfolio của tôi</h1>
    <p>Tôi là một lập trình viên Frontend đam mê công nghệ.</p>
    <Button as={Link} to="/projects" variant="primary">Xem dự án của mình</Button>
  </Container>
);

const SkillsPage = () => (
  <Container className="py-4">
    <h2>Kỹ năng cá nhân</h2>
    <ListGroup className="mt-3">
      <ListGroup.Item>ReactJS & React Router</ListGroup.Item>
      <ListGroup.Item>HTML5, CSS3, JavaScript (ES6+)</ListGroup.Item>
      <ListGroup.Item>Bootstrap / React-Bootstrap</ListGroup.Item>
      <ListGroup.Item>Git & GitHub Workflow</ListGroup.Item>
    </ListGroup>
  </Container>
);

const ProjectsPage = () => (
  <Container className="py-4">
    <h2>Dự án tiêu biểu</h2>
    <div className="d-flex gap-3 mt-3 flex-wrap">
      {['Website Tin tức', 'E-commerce App', 'Portfolio Personal'].map((title, idx) => (
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

const ContactPage = () => (
  <Container className="py-4">
    <h2>Thông tin liên hệ</h2>
    <p>Email: student@fpt.edu.vn</p>
    <p>Điện thoại: 0123 456 789</p>
  </Container>
);

const NotFoundPage = () => (
  <Container className="py-5 text-center">
    <h1 className="display-1 text-danger">404</h1>
    <h2>Trang không tồn tại</h2>
    <p>Đường dẫn bạn truy cập không đúng.</p>
    <Button as={Link} to="/" variant="secondary">Về trang chủ</Button>
  </Container>
);

export default function Bai1() {
  const MENU = [
    { to: '/', label: 'Trang chủ' },
    { to: '/skills', label: 'Kỹ năng' },
    { to: '/projects', label: 'Dự án' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Portfolio</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {MENU.map((item) => (
                <Nav.Link as={NavLink} key={item.to} to={item.to} end={item.to === '/'}>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}