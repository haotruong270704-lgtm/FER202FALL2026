import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  // Lấy danh sách danh mục không trùng lặp bằng Set và Spread operator
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  return (
    <div>
      {/* Tiêu đề hiển thị số lượng sản phẩm bằng Template Literal */}
      <h5 className="mb-3">Có {products.length} sản phẩm</h5>

      {/* Thanh nút bấm danh mục */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <Button key={cat} variant="outline-primary" size="sm">
            {cat}
          </Button>
        ))}
      </div>

      {/* Lưới sản phẩm responsive: 1 cột điện thoại, 2 cột tablet, 4 cột màn hình lớn */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          // key đặt ở phần tử ngoài cùng trong map (là Col)
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;