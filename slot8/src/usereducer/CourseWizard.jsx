import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { COURSES, SCHEDULES, STEPS, wizardReducer, initWizard } from './wizardReducer';

const formatVND = (n) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export default function CourseWizard({ initialCourseId = 'react' }) {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard);
  const { step, maxVisited, values, errors, submitted } = state;
  const course = COURSES.find((c) => c.id === values.courseId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value: type === 'checkbox' ? checked : value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' });
  };

  if (submitted) {
    return (
      <Alert variant="success" style={{ maxWidth: 560 }} className="mb-4">
        <Alert.Heading>Đăng ký thành công!</Alert.Heading>
        <p>{`${values.fullName} đã đăng ký ${course.name} (${values.schedule}). Học phí: ${formatVND(course.fee)}.`}</p>
        <Button variant="outline-success" onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}>
          Đăng ký khóa khác
        </Button>
      </Alert>
    );
  }

  return (
    <Card style={{ maxWidth: 560 }} className="mb-4">
      <Card.Header>
        <Card.Title className="fs-6 mb-2">Bài 4: Form Đăng ký khóa học</Card.Title>
        <Nav variant="pills">
          {STEPS.map((label, i) => (
            <Nav.Item key={label}>
              <Nav.Link
                active={i === step}
                disabled={i > maxVisited}
                onClick={() => dispatch({ type: 'GO_TO', payload: i })}
              >
                {`${i + 1}. ${label}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control name="fullName" value={values.fullName} onChange={handleChange} isInvalid={Boolean(errors.fullName)} />
                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={values.email} onChange={handleChange} isInvalid={Boolean(errors.email)} />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control name="phone" value={values.phone} onChange={handleChange} isInvalid={Boolean(errors.phone)} />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Khóa học</Form.Label>
                <Form.Select name="courseId" value={values.courseId} onChange={handleChange} isInvalid={Boolean(errors.courseId)}>
                  <option value="">-- Chọn khóa học --</option>
                  {COURSES.map(({ id, name, fee }) => (
                    <option key={id} value={id}>{`${name} – ${formatVND(fee)}`}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.courseId}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="d-block">Lịch học</Form.Label>
                {SCHEDULES.map((s, i) => (
                  <Form.Check
                    inline key={s} type="radio" id={`sch-${i}`} name="schedule" label={s} value={s}
                    checked={values.schedule === s} onChange={handleChange} isInvalid={Boolean(errors.schedule)}
                  />
                ))}
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <ListGroup className="mb-3">
                <ListGroup.Item>{`Học viên: ${values.fullName}`}</ListGroup.Item>
                <ListGroup.Item>{`Liên hệ: ${values.email} · ${values.phone}`}</ListGroup.Item>
                <ListGroup.Item>{`Khóa học: ${course?.name ?? ''} · ${values.schedule}`}</ListGroup.Item>
                <ListGroup.Item className="fw-bold">{`Học phí: ${course ? formatVND(course.fee) : ''}`}</ListGroup.Item>
              </ListGroup>
              <Form.Check
                id="wz-agree" name="agree" className="mb-3" label="Tôi xác nhận thông tin trên là chính xác"
                checked={values.agree} onChange={handleChange}
                isInvalid={Boolean(errors.agree)} feedback={errors.agree} feedbackType="invalid"
              />
            </>
          )}

          <div className="d-flex justify-content-between">
            <Button variant="outline-secondary" disabled={step === 0} onClick={() => dispatch({ type: 'BACK' })}>
              ← Quay lại
            </Button>
            <Button type="submit" variant={step === STEPS.length - 1 ? 'success' : 'primary'}>
              {step === STEPS.length - 1 ? 'Xác nhận' : 'Tiếp tục →'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}