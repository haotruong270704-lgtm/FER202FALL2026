import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { cartItems } from '../data/cart';
import { products } from '../data/products';

const CartTable = () => {
  // Hàm định dạng tiền tệ
  const formatVND = (n) =>
    n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // 1. Sắp xếp giỏ hàng theo thành tiền (price * quantity) giảm dần mà không làm thay đổi mảng gốc cartItems
  const sortedItems = [...cartItems].sort(
    (a, b) => b.price * b.quantity - a.price * a.quantity
  );

  // 2. Tính tổng tiền bằng reduce
  const totalPrice = cartItems.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  // 3. Tính tổng số lượng bằng reduce
  const totalQuantity = cartItems.reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );

  // 4. Lấy đơn giá cao nhất bằng Math.max kết hợp Spread operator
  const maxPrice = Math.max(...cartItems.map((item) => item.price));

  // 5. Lọc danh sách sản phẩm đang giảm giá và còn hàng bằng filter
  const onSaleProducts = products.filter(
    ({ inStock, discount }) => inStock && discount > 0
  );

  return (
    <div>
      {/* Bảng giỏ hàng */}
      <Table striped bordered hover responsive className="shadow-sm align-middle">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(({ id, name, price, quantity }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{formatVND(price)}</td>
              <td>{quantity}</td>
              <td className="fw-bold">{formatVND(price * quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-light fw-bold">
          <tr>
            <td colSpan={3} className="text-end">
              Tổng số lượng:
            </td>
            <td colSpan={2}>{totalQuantity} sản phẩm</td>
          </tr>
          <tr>
            <td colSpan={3} className="text-end">
              Tổng tiền thanh toán:
            </td>
            <td colSpan={2} className="text-danger fs-5">
              {formatVND(totalPrice)}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="text-end">
              Đơn giá cao nhất trong giỏ:
            </td>
            <td colSpan={2} className="text-primary">
              {formatVND(maxPrice)}
            </td>
          </tr>
        </tfoot>
      </Table>

      {/* Danh sách sản phẩm giảm giá và còn hàng */}
      <h6 className="mt-4 mb-2">🔥 Sản phẩm đang giảm giá & còn hàng:</h6>
      <ListGroup variant="flush" className="shadow-sm rounded border">
        {onSaleProducts.map(({ id, name, discount, price }) => (
          <ListGroup.Item
            key={id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-semibold me-2">{name}</span>
              <small className="text-muted">({formatVND(price)})</small>
            </div>
            <Badge bg="danger">-{discount}%</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CartTable;