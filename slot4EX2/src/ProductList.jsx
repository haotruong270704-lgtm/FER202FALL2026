import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const pizzas = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: "$12.99",
    desc: "Sốt cà chua, phô mai Mozzarella tươi và lá húng tây.",
    image: "/images/pizza1.webp"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: "$14.99",
    desc: "Xúc xích Pepperoni bò, sốt cà chua và phô mai nướng chảy.",
    image: "/images/pizza2.webp"
  },
  {
    id: 3,
    name: "Hawaiian Pizza",
    price: "$13.99",
    desc: "Thịt heo muối, dứa ngọt, sốt cà chua và phô mai.",
    image: "/images/pizza3.webp"
  },
  {
    id: 4,
    name: "Seafood Tropical",
    price: "$16.99",
    desc: "Hải sản tươi, sốt Pesto và phô mai phủ cao cấp.",
    image: "/images/pizza4.webp"
  }
];

function ProductList() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Pizza Menu</h2>
      <Row>
        {pizzas.map((pizza) => (
          <Col key={pizza.id} xs={12} sm={6} md={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={pizza.image} 
                style={{ height: '180px', objectFit: 'cover' }} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{pizza.name}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted">{pizza.desc}</Card.Text>
                <h5 className="text-success fw-bold mb-3">{pizza.price}</h5>
                <Button variant="outline-primary" className="mt-auto">Order Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;