import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputField from './InputField';
import AppButton from './AppButton';
import { fields, genders, majors } from '../data/registerConfig';

const RegisterForm = () => {
  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Header bg="primary" className="bg-primary text-white text-center py-3">
            <h4 className="mb-0">Form Đăng Ký Sinh Viên</h4>
          </Card.Header>
          <Card.Body className="p-4">
            {/* Chặn reload trang khi bấm submit bằng e.preventDefault() */}
            <Form onSubmit={(e) => e.preventDefault()}>
              {/* 1. Sinh các ô nhập dữ liệu từ mảng fields bằng map và spread props */}
              {fields.map((field) => (
                <InputField key={field.id} {...field} />
              ))}

              {/* 2. Nhóm Radio Giới tính */}
              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">Giới tính</Form.Label>
                {genders.map((gender) => (
                  <Form.Check
                    inline
                    key={gender}
                    type="radio"
                    name="gender"
                    id={`gender-${gender}`} // Template literal tạo id động
                    label={gender}
                    defaultChecked={gender === 'Nam'}
                  />
                ))}
              </Form.Group>

              {/* 3. Ô Select Chuyên ngành */}
              <Form.Group className="mb-3" controlId="major">
                <Form.Label className="fw-semibold">Chuyên ngành</Form.Label>
                <Form.Select aria-label="Chọn chuyên ngành">
                  <option value="">-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* 4. Checkbox Điều khoản */}
              <Form.Group className="mb-4" controlId="terms">
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý với các điều khoản và quy định"
                  required
                />
              </Form.Group>

              {/* 5. Nút đăng ký full chiều ngang */}
              <AppButton type="submit" variant="primary" className="w-100 py-2 fs-5">
                Đăng ký ngay
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;