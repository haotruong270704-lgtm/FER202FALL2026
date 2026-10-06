// src/components/CartReducer.jsx
import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Danh sách sản phẩm mẫu
const PRODUCTS = [
  { id: 101, name: 'Áo Phông Nam', price: 150000 },
  { id: 102, name: 'Quần Jean Nu', price: 350000 },
  { id: 103, name: 'Giày Sneaker', price: 650000 },
];

// Trạng thái ban đầu
const initialState = {
  items: [],
};

// Định nghĩa Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

const CartReducer = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const totalPrice = cartState.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="shadow-sm my-4">
      <Card.Header as="h5" className="bg-success text-white d-flex justify-content-between align-items-center">
        <span>Bài 7: Giỏ hàng sử dụng useReducer</span>
        <Badge bg="light" text="dark">
          Tổng số lượng: {totalQuantity}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={12}>
            <h6>Danh sách sản phẩm</h6>
            <div className="d-flex gap-2 flex-wrap">
              {PRODUCTS.map((prod) => (
                <Card key={prod.id} style={{ width: '12rem' }} className="p-2 text-center">
                  <strong>{prod.name}</strong>
                  <span className="text-danger my-1">{prod.price.toLocaleString('vi-VN')} đ</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => dispatch({ type: 'ADD_TO_CART', payload: prod })}
                  >
                    + Thêm vào giỏ
                  </Button>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        <hr />

        <h6>Chi tiết giỏ hàng</h6>
        {cartState.items.length === 0 ? (
          <p className="text-muted">Giỏ hàng đang trống.</p>
        ) : (
          <>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th className="text-center">Số lượng</th>
                  <th>Thành tiền</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cartState.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price.toLocaleString('vi-VN')} đ</td>
                    <td className="text-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-1 px-2"
                        onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                      >
                        -
                      </Button>
                      <span className="fw-bold mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-1 px-2"
                        onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                      >
                        +
                      </Button>
                    </td>
                    <td>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Xóa tất cả
              </Button>
              <h5 className="mb-0 text-primary">
                Tổng thanh toán: {totalPrice.toLocaleString('vi-VN')} đ
              </h5>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartReducer;