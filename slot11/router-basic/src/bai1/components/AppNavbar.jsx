import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../bai5/context/AuthContext';

export default function AppNavbar() {
  const { user, logout } = useAuth();

  const MENU = [
    { to: '/', label: 'Trang chủ' },
    { to: '/skills', label: 'Kỹ năng' },
    { to: '/projects', label: 'Dự án' },
    { to: '/books', label: 'Thư viện' },
    { to: '/courses', label: 'Môn học' },
    { to: '/events', label: 'Sự kiện' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Portfolio</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">
            {MENU.map((item) => (
              <Nav.Link as={NavLink} key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </Nav.Link>
            ))}

            {user ? (
              <div className="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0">
                <Nav.Link as={NavLink} to="/profile" className="text-warning fw-bold">
                  👤 {user.username}
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={logout}>
                  Thoát
                </Button>
              </div>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary btn-sm text-white ms-lg-3 mt-2 mt-lg-0">
                Đăng nhập
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}