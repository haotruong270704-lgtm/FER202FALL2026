// src/bai2/Bai2.jsx
import { Routes, Route, Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';

const MainLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Thư viện FPT</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
          <Nav.Link as={NavLink} to="/books">Sách</Nav.Link>
          <Nav.Link as={NavLink} to="/help">Hướng dẫn</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    <Container as="main" className="py-4 flex-grow-1">
      <Outlet />
    </Container>

    <footer className="bg-light text-center py-3 border-top">
      <Container>© 2026 Thư viện FPT University. All rights reserved.</Container>
    </footer>
  </div>
);

const HomePage = () => <h2>Trang chủ Thư viện FPT</h2>;

const BooksPage = () => (
  <div>
    <h2>Danh sách sách</h2>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr><th>#</th><th>Tên sách</th><th>Tác giả</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Lập trình ReactJS</td><td>Nguyễn Văn A</td></tr>
        <tr><td>2</td><td>Cấu trúc dữ liệu</td><td>Trần Văn B</td></tr>
        <tr><td>3</td><td>Nhập môn kĩ thuật phần mềm</td><td>Lê Văn C</td></tr>
      </tbody>
    </Table>
  </div>
);

const HelpLayout = () => (
  <div>
    <h2>Trung tâm Hướng dẫn</h2>
    <Nav variant="tabs" className="mb-3">
      <Nav.Link as={NavLink} to="faq">Câu hỏi thường gặp</Nav.Link>
      <Nav.Link as={NavLink} to="rules">Nội quy</Nav.Link>
    </Nav>
    <Outlet />
  </div>
);

const FaqPage = () => <p>FAQ: Làm sao để mượn sách? Trả lời: Đến quầy lễ tân hoặc mượn online.</p>;
const RulesPage = () => <p>Nội quy: Trả sách đúng hạn, không làm rách hỏng tài liệu.</p>;
const NotFoundPage = () => <h2>404 - Trang không tìm thấy</h2>;

export default function Bai2() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="help" element={<HelpLayout />}>
          <Route index element={<Navigate to="faq" replace />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="rules" element={<RulesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}