import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

function classify(bmi) {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' };
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' };
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' };
  return { label: 'Béo phì', variant: 'danger' };
}

function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  const h = Number(height);
  const w = Number(weight);
  const hInMeters = unit === 'cm' ? h / 100 : h;

  const minH = unit === 'cm' ? 50 : 0.5;
  const maxH = unit === 'cm' ? 250 : 2.5;

  const errors = {};
  if (height !== '' && (isNaN(h) || h < minH || h > maxH)) {
    errors.height = `Chiều cao từ ${minH} đến ${maxH} ${unit}`;
  }
  if (weight !== '' && (isNaN(w) || w < 10 || w > 300)) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg';
  }

  const ready = height !== '' && weight !== '' && !errors.height && !errors.weight;
  const bmi = ready ? (w / (hInMeters * hInMeters)).toFixed(1) : null;
  const result = bmi ? classify(Number(bmi)) : null;

  const changeUnit = (nextUnit) => {
    if (unit === nextUnit) return;
    if (height !== '') {
      const val = Number(height);
      if (!isNaN(val)) {
        setHeight(nextUnit === 'm' ? String(val / 100) : String(val * 100));
      }
    }
    setUnit(nextUnit);
  };

  return (
    <Card className="mb-4 shadow">
      <Card.Header as="h4" className="bg-info text-white">
        Adv 3: Máy Tính BMI (Chuẩn Châu Á)
      </Card.Header>
      <Card.Body>
        <Form className="mb-3">
          <Row className="g-3">
            <Col md={6}>
              <Form.Label className="fw-bold">
                Chiều cao ({unit})
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 ms-2"
                  onClick={() => changeUnit(unit === 'cm' ? 'm' : 'cm')}
                >
                  (Đổi sang {unit === 'cm' ? 'm' : 'cm'})
                </Button>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder={`Nhập chiều cao (${unit})`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                isInvalid={!!errors.height}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label className="fw-bold">Cân nặng (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập cân nặng (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                isInvalid={!!errors.weight}
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form>

        {result ? (
          <Alert variant={result.variant} className="text-center mb-0 fs-5 fw-bold">
            BMI = {bmi} → {result.label}
          </Alert>
        ) : (
          <Alert variant="secondary" className="text-center mb-0">
            Vui lòng nhập đầy đủ và hợp lệ thông tin chiều cao, cân nặng để tính BMI.
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default BmiCalculator;