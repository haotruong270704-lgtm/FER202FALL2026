import { useReducer, useState } from 'react';
import { Container, Form, Button, Modal, Card, Alert } from 'react-bootstrap';

// 1. Trạng thái khởi tạo của Form
const initialState = {
  values: {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  },
  errors: {},
  isSubmitted: false,
};

// 2. Hàm validate dữ liệu
const validateForm = (values) => {
  const errors = {};
  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên!';
  }
  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email!';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email không hợp lệ!';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại!';
  } else if (!/^[0-9]{10}$/.test(values.phone.trim())) {
    errors.phone = 'Số điện thoại phải gồm 10 chữ số!';
  }
  if (!values.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung tin nhắn!';
  }
  return errors;
};

// 3. Reducer function xử lý các hành động
function contactReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      const newValues = {
        ...state.values,
        [action.field]: action.value,
      };
      // Nếu form đã bấm submit lần đầu thì validate trực tiếp khi gõ
      const newErrors = state.isSubmitted ? validateForm(newValues) : state.errors;
      return {
        ...state,
        values: newValues,
        errors: newErrors,
      };
    }
    case 'SUBMIT_FORM': {
      const validationErrors = validateForm(state.values);
      return {
        ...state,
        errors: validationErrors,
        isSubmitted: true,
      };
    }
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

export default function Contact() {
  // Quản lý state của Form bằng useReducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Quản lý trạng thái đóng/mở Modal bằng useState
  const [showModal, setShowModal] = useState(false);
  // Lưu trữ dữ liệu hợp lệ để hiển thị lên Modal
  const [submittedData, setSubmittedData] = useState(null);

  // Xử lý khi người dùng thay đổi giá trị input
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: e.target.name,
      value: e.target.value,
    });
  };

  // Xử lý khi ấn nút Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });

    // Kiểm tra tính hợp lệ của dữ liệu
    const errors = validateForm(state.values);
    if (Object.keys(errors).length === 0) {
      setSubmittedData(state.values);
      setShowModal(true);
    }
  };

  // Đóng Modal và làm sạch Form
  const handleCloseModal = () => {
    setShowModal(false);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="my-5" style={{ maxWidth: '650px' }}>
      <Card className="shadow-sm border-0 p-4">
        <h2 className="text-danger fw-bold text-center mb-4">Trang Liên Hệ (Contact)</h2>
        <Form onSubmit={handleSubmit} noValidate>
          {/* Họ và tên */}
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label className="fw-semibold">Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên..."
              value={state.values.fullName}
              onChange={handleChange}
              isInvalid={!!state.errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-semibold">Địa chỉ Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="nhanvien@example.com"
              value={state.values.email}
              onChange={handleChange}
              isInvalid={!!state.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Số điện thoại */}
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="0912345678"
              value={state.values.phone}
              onChange={handleChange}
              isInvalid={!!state.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Nội dung lời nhắn */}
          <Form.Group className="mb-4" controlId="formMessage">
            <Form.Label className="fw-semibold">Nội dung liên hệ</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="Nhập nội dung cần hỗ trợ..."
              value={state.values.message}
              onChange={handleChange}
              isInvalid={!!state.errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100 fw-bold py-2">
            Gửi thông tin liên hệ
          </Button>
        </Form>
      </Card>

      {/* Modal hiển thị khi Validate thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title className="fw-bold fs-5">Completed Lab5</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" className="mb-3">
            Cảm ơn bạn! Thông tin liên hệ đã được gửi thành công.
          </Alert>
          {submittedData && (
            <div className="bg-light p-3 rounded border">
              <p className="mb-2">
                <strong>Họ và tên:</strong> {submittedData.fullName}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p className="mb-2">
                <strong>Số điện thoại:</strong> {submittedData.phone}
              </p>
              <p className="mb-0">
                <strong>Nội dung:</strong> {submittedData.message}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}