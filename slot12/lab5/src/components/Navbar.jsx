import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Nav className="me-auto gap-3">
          <Nav.Link as={NavLink} to="/" end className="fs-5 text-dark">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="fs-5 text-secondary">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/news" className="fs-5 text-secondary">
            News
          </Nav.Link>
          <Nav.Link as={NavLink} to="/quiz" className="fs-5 text-secondary">
            Quiz
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="fs-5 text-secondary">
            Contact
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}