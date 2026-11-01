// src/components/QuantityCart.jsx
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const QuantityCart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="shadow-sm mx-auto my-4 text-center" style={{ maxWidth: '400px' }}>
      <Card.Header as="h5" className="bg-primary text-white">
        Bài 1: Quantity & Mini Cart
      </Card.Header>
      <Card.Body>
        <Card.Title>Sản phẩm mẫu</Card.Title>
        <Card.Text>Giá: 100.000 đ</Card.Text>
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <Button variant="outline-secondary" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</Button>
          <span className="fw-bold px-3">{quantity}</span>
          <Button variant="outline-secondary" onClick={() => setQuantity((q) => q + 1)}>+</Button>
        </div>
        <h6>Tổng tiền: {(quantity * 100000).toLocaleString('vi-VN')} đ</h6>
      </Card.Body>
    </Card>
  );
};

export default QuantityCart;