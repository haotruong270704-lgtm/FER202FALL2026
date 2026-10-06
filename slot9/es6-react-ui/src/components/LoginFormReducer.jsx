// src/components/LoginFormReducer.jsx
import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  error: null,
  isSuccess: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        error: null,
      };
    case 'LOGIN_START':
      return {
        ...state,
        isSubmitting: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSuccess: true,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const LoginFormReducer = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, isSubmitting, error, isSuccess } = state;

  const handleChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    // Giả lập gọi API đăng nhập trong 1.5 giây
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123456') {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: 'Email hoặc mật khẩu không chính xác! (Gợi ý: admin@gmail.com / 123456)',
        });
      }
    }, 1500);
  };

  return (
    <Card className="shadow-sm mx-auto my-4" style={{ maxWidth: '450px' }}>
      <Card.Header as="h5" className="bg-info text-white">
        Bài 8: Form Đăng nhập với useReducer
      </Card.Header>
      <Card.Body>
        {isSuccess ? (
          <Alert variant="success" className="text-center">
            <h5>Đăng nhập thành công!</h5>
            <p className="mb-2">Chào mừng <strong>{email}</strong> quay trở lại.</p>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => dispatch({ type: 'RESET' })}
            >
              Đăng xuất / Thử lại
            </Button>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email..."
                value={email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Button
              variant="info"
              type="submit"
              className="w-100 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoginFormReducer;