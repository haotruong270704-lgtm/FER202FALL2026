import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = (name, value) => {
    let errorMsg = '';
    if (name === 'username' && !value.trim()) {
      errorMsg = 'Tên đăng nhập không được để trống';
    }
    if (name === 'password') {
      if (!value) {
        errorMsg = 'Mật khẩu không được để trống';
      } else if (value.length < 6) {
        errorMsg = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate ngay khi gõ
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameError = validate('username', formData.username);
    const passwordError = validate('password', formData.password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg('');

    // Giả lập gọi API đăng nhập mất 1.5 giây
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Đăng nhập thành công với tài khoản: ${formData.username}`);
      setFormData({ username: '', password: '' });
    }, 1500);
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 400 }}>
      <h4 className="mb-3">Đăng nhập</h4>
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUsername">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Nhập username..."
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Nhập password..."
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;