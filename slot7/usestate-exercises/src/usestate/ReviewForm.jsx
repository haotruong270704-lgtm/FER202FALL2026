import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div onMouseLeave={() => setHovered(0)} className="d-inline-block">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <span
          key={star}
          style={{ cursor: 'pointer', fontSize: '1.8rem' }}
          className={star <= display ? 'text-warning' : 'text-muted'}
          onMouseEnter={() => setHovered(star)}
          onClick={() => onChange(star === value ? 0 : star)}
        >
          ★
        </span>
      ))}
      <span className="ms-2 fw-semibold text-secondary">
        {LABELS[display] || 'Chưa đánh giá'}
      </span>
    </div>
  );
}

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const canSubmit = rating > 0 && comment.trim().length >= 5;

  const average = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setReviews((prev) => [
      { id: Date.now(), rating, comment: comment.trim() },
      ...prev,
    ]);
    setRating(0);
    setComment('');
  };

  return (
    <Card className="mb-4 shadow">
      <Card.Header as="h4" className="bg-success text-white">
        Adv 2: Đánh Giá Sao & Nhận Xét
      </Card.Header>
      <Card.Body>
        <h5 className="mb-3">
          Trung bình {average}/5 ({reviews.length} lượt đánh giá)
        </h5>

        <Form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <Form.Label className="d-block fw-bold">Chọn đánh giá:</Form.Label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nhận xét (ít nhất 5 ký tự)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="success" disabled={!canSubmit}>
            Gửi đánh giá
          </Button>
        </Form>

        <ListGroup variant="flush">
          {reviews.map((r) => (
            <ListGroup.Item key={r.id} className="px-0">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-warning fw-bold fs-5">
                  {'★'.repeat(r.rating)}
                  <span className="text-muted">{'★'.repeat(5 - r.rating)}</span>
                </span>
                <small className="text-muted">{new Date(r.id).toLocaleTimeString()}</small>
              </div>
              <p className="mb-0 text-dark">{r.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ReviewForm;