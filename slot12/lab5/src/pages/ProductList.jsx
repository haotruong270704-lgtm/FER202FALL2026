import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../data/products';
import MyProduct from '../components/MyProduct';

export default function ProductList() {
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