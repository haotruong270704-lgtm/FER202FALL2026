// ES6: import/export
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import { ProductList, AppButton, InputField } from '../components';
import { products } from '../data/products';
import { APP_NAME } from '../data/menu';

// ES6: arrow function, default params
const HomePage = ({ allProducts = products }) => {
  // Hàm định dạng tiền tệ
  // ES6: arrow function
  const formatVND = (amount) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // 1. Lọc sản phẩm đang giảm giá
  // ES6: const, arrow function, filter, destructuring
  const onSale = allProducts.filter(({ discount }) => discount > 0);

  // 2. Sắp xếp giảm giá giảm dần và lấy 4 sản phẩm đầu tiên
  // ES6: spread operator (...), sort, arrow function, destructuring
  const deals = [...onSale]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  // 3. Lấy danh sách danh mục không trùng lặp
  // ES6: spread operator (...), Set, map, optional chaining (?.)
  const categories = [
    'Tất cả danh mục',
    ...new Set(allProducts.map((p) => p.category?.name).filter(Boolean)),
  ];

  // 4. Thống kê dữ liệu
  // ES6: const, filter, reduce, destructuring, nullish coalescing (??)
  const total = allProducts.length; // ES6: const
  const inStockCount = allProducts.filter(({ inStock }) => inStock).length;
  const totalPriceSum = allProducts.reduce(
    (sum, { price }) => sum + (price ?? 0),
    0
  );
  const avgPrice = total > 0 ? Math.round(totalPriceSum / total) : 0; // ES6: toán tử 3 ngôi

  // ES6: object shorthand
  const stats = { total, inStockCount, avgPrice };

  // ES6: destructuring
  const { total: totalStat, inStockCount: stockStat, avgPrice: avgStat } = stats;

  // 5. Mảng các thẻ thống kê
  // ES6: const, template literals
  const statCards = [
    { label: 'Tổng sản phẩm', value: `${totalStat} sản phẩm` },
    { label: 'Còn hàng', value: `${stockStat} sản phẩm` },
    { label: 'Giá trung bình', value: formatVND(avgStat) },
  ];

  return (
    <div className="d-flex flex-column gap-4">
      {/* KHỐI 1: HERO */}
      <Card className="bg-primary text-white p-4 shadow-sm border-0">
        <Card.Body className="text-center py-4">
          {/* ES6: template literals */}
          <h1 className="fw-bold mb-3">Chào mừng đến {APP_NAME}</h1>
          <p className="fs-5 mb-0 opacity-75">
            Hôm nay có {onSale.length} sản phẩm đang giảm giá!
          </p>
        </Card.Body>
      </Card>

      {/* KHỐI 2: THỐNG KÊ */}
      <Row className="g-3">
        {/* ES6: map, destructuring */}
        {statCards.map(({ label, value }, index) => (
          // ES6: template literals (dùng index làm fallback key)
          <Col md={4} key={`stat-${index}`}>
            <Card className="text-center h-100 shadow-sm border-0 bg-light">
              <Card.Body className="py-3">
                <Card.Text className="text-muted small mb-1 fw-medium">
                  {label}
                </Card.Text>
                <Card.Title className="fs-4 fw-bold text-primary mb-0">
                  {value}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* KHỐI 3: BỘ LỌC (GIAO DIỆN TĨNH) */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-3">
          <InputGroup>
            <Form.Control
              placeholder="Tìm sản phẩm..."
              aria-label="Tìm sản phẩm"
            />
            <Form.Select aria-label="Chọn danh mục">
              {/* ES6: map */}
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            <AppButton variant="primary">Tìm kiếm</AppButton>
          </InputGroup>
        </Card.Body>
      </Card>

      {/* KHỐI 4: ĐANG GIẢM GIÁ (DEALS) */}
      <section>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold mb-0 text-danger">🔥 Đang giảm giá sâu nhất</h4>
        </div>
        <ProductList products={deals} />
      </section>

      {/* KHỐI 5: TẤT CẢ SẢN PHẨM */}
      <section>
        <h4 className="fw-bold mb-3">📦 Tất cả sản phẩm</h4>
        {/* ES6: toán tử 3 ngôi */}
        {allProducts.length === 0 ? (
          <Alert variant="info" className="text-center py-4">
            Chưa có sản phẩm nào để hiển thị.
          </Alert>
        ) : (
          <ProductList products={allProducts} />
        )}
      </section>

      {/* KHỐI 6: NHẬN TIN */}
      <Card className="bg-light shadow-sm border-0">
        <Card.Body className="p-4">
          <Row className="justify-content-center text-center mb-3">
            <Col md={8}>
              <h5 className="fw-bold">Đăng ký nhận thông tin khuyến mãi</h5>
              <p className="text-muted small mb-0">
                Nhập email của bạn để nhận tin tức về các ưu đãi giảm giá sớm nhất.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={6}>
              {/* ES6: arrow function */}
              <Form onSubmit={(e) => e.preventDefault()}>
                <div className="d-flex gap-2 align-items-start">
                  <div className="flex-grow-1">
                    <InputField
                      id="newsletterEmail"
                      type="email"
                      placeholder="Nhập email của bạn..."
                      required
                    />
                  </div>
                  <AppButton type="submit" variant="success" className="px-4">
                    Đăng ký
                  </AppButton>
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

// ES6: export default
export default HomePage;