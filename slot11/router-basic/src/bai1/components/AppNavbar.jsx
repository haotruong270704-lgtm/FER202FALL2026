import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar() {
  const MENU = [
    { to: '/', label: 'Trang chủ' },
    { to: '/skills', label: 'Kỹ năng' },
    { to: '/projects', label: 'Dự án' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  return (
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
  );
}