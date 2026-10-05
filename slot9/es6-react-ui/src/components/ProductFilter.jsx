import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { productsData } from '../data/products';
import { formatVND } from '../utils/format';

const ProductFilter = () => {
  const [products] = useState(productsData);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Lấy danh sách danh mục không trùng lặp
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Lọc sản phẩm
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Row className="mb-3 g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'Tất cả danh mục' : cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-3">
        {filteredProducts.map((p) => (
          <Col key={p.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="secondary">{p.category}</Badge>
                  <Badge bg={p.inStock ? 'success' : 'danger'}>
                    {p.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </Badge>
                </div>
                <Card.Title className="fs-6">{p.name}</Card.Title>
                <Card.Text className="fw-bold text-primary mb-0">
                  {formatVND(p.price)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductFilter;