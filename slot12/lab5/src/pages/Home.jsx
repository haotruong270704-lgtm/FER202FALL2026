import { Container, Row, Col } from 'react-bootstrap';
import MyProduct from '../components/MyProduct';
import { products } from '../data/products';

export default function Home() {
  return (
    <Container className="my-4">
      <h2 className="text-danger fw-bold text-center mb-4">Danh Sách Sản Phẩm</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((item) => (
          <Col key={item.id}>
            <MyProduct product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}