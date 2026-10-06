// src/components/MiniShop.jsx
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

import { useCart } from '../context/CartContext';
import { useAuth, useTheme } from '../context/AppContexts';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, category: 'Laptop' },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, category: 'Điện thoại' },
  { id: 3, name: 'Tai nghe Sony WH-1000XM5', price: 8000000, category: 'Phụ kiện' },
  { id: 4, name: 'Bàn phím Cơ Keychron K2', price: 2200000, category: 'Phụ kiện' },
];

const SHIPPING_FEE = 30000;
const FREE_SHIPPING = 10000000;

const MiniShop = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { cart, totalPrice, totalQuantity, addToCart, increase, decrease, remove, clearCart } = useCart();

  const [page, setPage] = useState('shop'); // 'shop' | 'cart' | 'checkout'
  const [receiver, setReceiver] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});

  const shippingFee = totalPrice >= FREE_SHIPPING || totalPrice === 0 ? 0 : SHIPPING_FEE;
  const finalTotal = totalPrice + shippingFee;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!receiver.trim() || receiver.trim().length < 3) newErrors.receiver = 'Tên phải từ 3 ký tự';
    if (!/^0\d{9}$/.test(phone.trim())) newErrors.phone = 'SĐT gồm 10 số (bắt đầu bằng 0)';
    if (!address.trim() || address.trim().length < 10) newErrors.address = 'Địa chỉ từ 10 ký tự';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOrder({
      id: `DH${Math.floor(100000 + Math.random() * 900000)}`,
      receiver,
      phone,
      address,
      items: cart.items,
      total: finalTotal,
    });

    clearCart();
    setErrors({});
  };

  const isDark = theme === 'dark';

  return (
    <Card className={`shadow-sm mx-auto my-4 ${isDark ? 'bg-dark text-white' : ''}`}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Bài 10: Cửa hàng Mini & Thanh toán</h5>
        <div>
          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setPage('shop')}>
            Cửa hàng
          </Button>
          <Button variant="primary" size="sm" onClick={() => setPage('cart')}>
            Giỏ hàng <Badge bg="light" text="dark">{totalQuantity}</Badge>
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        {/* Trang Cửa Hàng */}
        {page === 'shop' && (
          <div>
            <h6>Danh sách sản phẩm</h6>
            <Row className="g-3">
              {PRODUCTS.map((p) => (
                <Col md={6} key={p.id}>
                  <Card className={`h-100 p-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
                    <h5>{p.name}</h5>
                    <p className="text-muted mb-1">Loại: {p.category}</p>
                    <p className="fw-bold text-danger mb-2">{p.price.toLocaleString('vi-VN')} đ</p>
                    <Button variant="success" size="sm" onClick={() => addToCart(p)}>
                      + Thêm vào giỏ
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Trang Giỏ Hàng */}
        {page === 'cart' && (
          <div>
            <h6>Giỏ hàng của bạn</h6>
            {cart.items.length === 0 ? (
              <Alert variant="info">Giỏ hàng đang trống.</Alert>
            ) : (
              <>
                <Table striped bordered hover responsive size="sm" className={isDark ? 'table-dark' : ''}>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString('vi-VN')} đ</td>
                        <td>
                          <Button size="sm" variant="secondary" onClick={() => decrease(item.id)}>-</Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button size="sm" variant="secondary" onClick={() => increase(item.id)}>+</Button>
                        </td>
                        <td>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                        <td>
                          <Button size="sm" variant="danger" onClick={() => remove(item.id)}>Xóa</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Tổng: {totalPrice.toLocaleString('vi-VN')} đ</h5>
                  <Button variant="success" onClick={() => setPage('checkout')}>Tiến hành thanh toán</Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Trang Thanh Toán */}
        {page === 'checkout' && (
          <div>
            {order ? (
              <Alert variant="success" className="text-center">
                <h4>Đặt hàng thành công!</h4>
                <p>Mã đơn hàng: <strong>{order.id}</strong></p>
                <p>Người nhận: {order.receiver} - SĐT: {order.phone}</p>
                <p>Địa chỉ: {order.address}</p>
                <p>Tổng tiền: <strong>{order.total.toLocaleString('vi-VN')} đ</strong></p>
                <Button variant="primary" onClick={() => { setOrder(null); setPage('shop'); }}>
                  Tiếp tục mua sắm
                </Button>
              </Alert>
            ) : (
              <Form onSubmit={handleCheckoutSubmit}>
                <h6>Thông tin giao hàng</h6>
                <Form.Group className="mb-2">
                  <Form.Label>Tên người nhận</Form.Label>
                  <Form.Control value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                  {errors.receiver && <small className="text-danger">{errors.receiver}</small>}
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxx" />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ giao hàng</Form.Label>
                  <Form.Control as="textarea" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </Form.Group>

                <Alert variant="secondary">
                  <div>Tiền hàng: {totalPrice.toLocaleString('vi-VN')} đ</div>
                  <div>Phí vận chuyển: {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')} đ`}</div>
                  <hr className="my-1" />
                  <strong>Tổng thanh toán: {finalTotal.toLocaleString('vi-VN')} đ</strong>
                </Alert>

                <Button type="submit" variant="success" className="w-100">
                  Xác nhận đặt hàng
                </Button>
              </Form>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MiniShop;