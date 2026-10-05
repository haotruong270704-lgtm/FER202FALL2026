import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const initialFormState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  agreeTerms: false,
};

const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = (name, value, currentData = formData) => {
    let errorMsg = '';

    switch (name) {
      case 'username':
        if (!value.trim()) errorMsg = 'Tên tài khoản không được để trống';
        break;
      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = 'Email không hợp lệ';
        }
        break;
      case 'password':
        if (!value) {
          errorMsg = 'Mật khẩu không được để trống';
        } else if (value.length < 6) {
          errorMsg = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errorMsg = 'Xác nhận mật khẩu không được để trống';
        } else if (value !== currentData.password) {
          errorMsg = 'Mật khẩu xác nhận không khớp';
        }
        break;
      case 'agreeTerms':
        if (!value) errorMsg = 'Bạn phải đồng ý với điều khoản dịch vụ';
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedData = { ...formData, [name]: fieldValue };
    setFormData(updatedData);

    const error = validate(name, fieldValue, updatedData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: validate('username', formData.username),
      email: validate('email', formData.email),
      password: validate('password', formData.password),
      confirmPassword: validate('confirmPassword', formData.confirmPassword),
      agreeTerms: validate('agreeTerms', formData.agreeTerms),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setIsSubmitting(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Đăng ký thành công tài khoản: ${formData.username}`);
      setFormData(initialFormState);
      setErrors({});
    }, 1500);
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 500 }}>
      <h4 className="mb-3">Tạo tài khoản mới</h4>
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="regUsername">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Nhập tên tài khoản..."
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="regEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="name@example.com"
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="regPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Tối thiểu 6 ký tự..."
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="regConfirmPassword">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Nhập lại mật khẩu..."
          />
          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block">Giới tính</Form.Label>
          <Form.Check
            inline
            type="radio"
            label="Nam"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          <Form.Check
            inline
            type="radio"
            label="Nữ"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          <Form.Check
            inline
            type="radio"
            label="Khác"
            name="gender"
            value="other"
            checked={formData.gender === 'other'}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="regAgreeTerms">
          <Form.Check
            type="checkbox"
            name="agreeTerms"
            label="Tôi đồng ý với các điều khoản dịch vụ"
            checked={formData.agreeTerms}
            onChange={handleChange}
            isInvalid={!!errors.agreeTerms}
            feedback={errors.agreeTerms}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;