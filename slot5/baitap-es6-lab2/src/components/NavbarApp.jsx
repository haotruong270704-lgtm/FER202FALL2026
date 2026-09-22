import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

const NavbarApp = ({ totalCartItems = 0 }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-primary fs-4">
          React<span className="text-white">Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#products">Sản phẩm</Nav.Link>
            <Nav.Link href="#students">Sinh viên</Nav.Link>
            <Nav.Link href="#register">Đăng ký</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#cart" className="fw-semibold text-white">
              🛒 Giỏ hàng <Badge bg="danger" pill>{totalCartItems}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;