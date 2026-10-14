import { Card, Badge, Button } from 'react-bootstrap';

export default function MyProduct({ product }) {
  // Nếu chưa truyền props product thì dùng dữ liệu mẫu mặc định
  const item = product || {
    id: 1,
    name: 'Pizza Hải Sản Cao Cấp',
    description: 'Pizza phủ hải sản tươi ngon cùng phô mai Mozzarella béo ngậy.',
    price: 150000,
    discount: 15, // Phần trăm giảm giá (15%)
    instock: true,
    rating: 4.8,
    category: 'Pizza',
  };

  // Tính giá sau giảm giá
  const finalPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  return (
    <Card className="h-100 shadow-sm border-0 position-relative">
      {/* Hiển thị Badge giảm giá nếu có */}
      {item.discount > 0 && (
        <Badge
          bg="danger"
          className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-6"
        >
          -{item.discount}%
        </Badge>
      )}

      <Card.Body className="d-flex flex-column">
        {/* Category & Rating */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="secondary" className="text-uppercase">
            {item.category}
          </Badge>
          <span className="text-warning fw-bold">
            ★ {item.rating} / 5
          </span>
        </div>

        {/* Tên sản phẩm */}
        <Card.Title className="fs-5 fw-bold">{item.name}</Card.Title>

        {/* Mô tả sản phẩm */}
        <Card.Text className="text-muted small flex-grow-1">
          {item.description}
        </Card.Text>

        {/* Giá & Tình trạng hàng */}
        <div className="mt-3">
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="fs-5 fw-bold text-danger">
              {finalPrice.toLocaleString('vi-VN')} đ
            </span>
            {item.discount > 0 && (
              <span className="text-decoration-line-through text-muted small">
                {item.price.toLocaleString('vi-VN')} đ
              </span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small className={item.instock ? 'text-success fw-bold' : 'text-danger fw-bold'}>
              {item.instock ? '● Còn hàng' : '○ Hết hàng'}
            </small>
            <Button
              variant={item.instock ? 'primary' : 'secondary'}
              size="sm"
              disabled={!item.instock}
            >
              {item.instock ? 'Thêm vào giỏ' : 'Hết hàng'}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}