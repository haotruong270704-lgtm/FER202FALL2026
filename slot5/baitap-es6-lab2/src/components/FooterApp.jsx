import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FooterApp = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 border-top border-secondary">
      <Container>
        <Row className="gy-3">
          <Col md={6}>
            <h5 className="text-primary fw-bold">React Bootstrap Lab</h5>
            <p className="text-secondary small mb-0">
              Bài tập thực hành ReactJS cơ bản với ES6, React-Bootstrap và JSX.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-1">© {new Date().getFullYear()} FPT University</p>
            <small className="text-secondary">Xây dựng bởi Student với ❤️</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterApp;