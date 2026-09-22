import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product }) => {
  // Destructuring thêm inStock và discount (mặc định = 0)
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock = true,
    discount = 0,
  } = product || {};

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const rate = rating?.rate ?? 'Chưa có';
  const count = rating?.count ?? 0;

  // Tính giá sau khi giảm giá
  const finalPrice = price ? price * (1 - discount / 100) : 0;

  const formatVND = (amount) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    /* Card ghép class opacity-50 bằng Template Literal khi hết hàng */
    <Card className={`h-100 shadow-sm position-relative ${inStock ? '' : 'opacity-50'}`}>
      {/* 1. Nhãn giảm giá ở góc trên bên phải (chỉ hiện khi discount > 0) */}
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="d-flex gap-1 mb-2 flex-wrap">
          {/* Badge danh mục */}
          <Badge bg="info" className="text-dark">
            {categoryName}
          </Badge>

          {/* 2. Trạng thái kho bằng toán tử 3 ngôi */}
          {inStock ? (
            <Badge bg="success">Còn hàng</Badge>
          ) : (
            <Badge bg="secondary">Hết hàng</Badge>
          )}

          {/* 3. Badge "Bán chạy" khi đánh giá >= 4.5 */}
          {rating?.rate >= 4.5 && (
            <Badge bg="warning" text="dark">
              Bán chạy
            </Badge>
          )}
        </div>

        <Card.Title className="fs-6">{name}</Card.Title>

        {/* 4. Hiển thị giá gốc (gạch ngang) và giá đã giảm */}
        <div className="mt-auto mb-2">
          {price !== undefined && price !== null ? (
            <div>
              {discount > 0 ? (
                <>
                  <span className="text-danger fw-bold fs-5 me-2">
                    {formatVND(finalPrice)}
                  </span>
                  <del className="text-muted small">{formatVND(price)}</del>
                </>
              ) : (
                <span className="text-danger fw-bold fs-5">
                  {formatVND(price)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-danger fw-bold fs-5">Liên hệ</span>
          )}
        </div>

        <Card.Text className="text-muted small mb-3">
          Đánh giá: ⭐ {rate} ({count} lượt)
        </Card.Text>

        {/* 5. Nút mua bị disabled khi hết hàng */}
        <Button variant="primary" disabled={!inStock} className="w-100 mt-auto">
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;