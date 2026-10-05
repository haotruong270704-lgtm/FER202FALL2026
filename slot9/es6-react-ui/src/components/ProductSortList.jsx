import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { productsData } from '../data/products';
import { formatVND } from '../utils/format';

const ProductSortList = () => {
  const [products] = useState(productsData);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-asc' | 'price-desc' | 'name-asc'
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // 1. Lọc sản phẩm
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStock = !inStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  // 2. Sắp xếp danh sách đã lọc (Derived State)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('default');
    setInStockOnly(false);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Danh sách sản phẩm (Lọc & Sắp xếp)</h4>

      {/* Thanh công cụ lọc và sắp xếp */}
      <Row className="mb-3 g-3 align-items-center">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Tìm tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
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
        <Col md={3}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sắp xếp mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="name-asc">Tên: A-Z</option>
          </Form.Select>
        </Col>
        <Col md={3} className="d-flex align-items-center justify-content-between gap-2">
          <Form.Check
            type="checkbox"
            id="inStockCheck"
            label="Chỉ còn hàng"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <Button variant="outline-secondary" size="sm" onClick={handleReset}>
            Đặt lại
          </Button>
        </Col>
      </Row>

      {/* Danh sách hiển thị */}
      <Row xs={1} md={2} lg={3} className="g-3">
        {sortedProducts.length === 0 ? (
          <Col xs={12}>
            <div className="text-center text-muted py-4">Không tìm thấy sản phẩm phù hợp</div>
          </Col>
        ) : (
          sortedProducts.map((p) => (
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
          ))
        )}
      </Row>
    </div>
  );
};

export default ProductSortList;