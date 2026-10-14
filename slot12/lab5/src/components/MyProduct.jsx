import { Card, Badge, Button } from 'react-bootstrap';

export default function MyProduct({ product }) {
  if (!product) return null;

  const { name, description, price, discount, instock, rating, category, image } = product;

  // Tính giá sau giảm giá
  const finalPrice = discount ? price * (1 - discount / 100) : price;

  // Format tiền tệ Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
      {/* Badge giảm giá */}
      {discount > 0 && (
        <Badge
          bg="danger"
          className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-6 z-1"
        >
          -{discount}%
        </Badge>
      )}

      {/* THẺ ĐỂ HIỂN THỊ ẢNH SẢN PHẨM */}
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        {/* Category & Rating */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="secondary" className="text-uppercase">
            {category}
          </Badge>
          <span className="text-warning fw-bold">
            ★ {rating} / 5
          </span>
        </div>

        {/* Tên sản phẩm */}
        <Card.Title className="fs-6 fw-bold">{name}</Card.Title>

        {/* Mô tả sản phẩm */}
        <Card.Text className="text-muted small flex-grow-1">
          {description}
        </Card.Text>

        {/* Giá & Nút bấm */}
        <div className="mt-3 pt-2 border-top">
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="fs-5 fw-bold text-danger">
              {formatCurrency(finalPrice)}
            </span>
            {discount > 0 && (
              <span className="text-decoration-line-through text-muted small">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small className={instock ? 'text-success fw-bold' : 'text-secondary fw-bold'}>
              {instock ? '● Còn hàng' : '○ Hết hàng'}
            </small>

            {/* Chỉ hiển thị nút khi còn hàng */}
            {instock && (
              <Button variant="primary" size="sm">
                Thêm vào giỏ
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}