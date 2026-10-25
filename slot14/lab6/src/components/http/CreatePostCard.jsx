import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function CreatePostCard() {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await postApi.create({ title: title.trim(), views: 0, userId: 1 });
      setResult({ status: res.status, data: res.data });
      setTitle('');
    } catch (err) {
      setError(err.userMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2. POST Create Post</strong></Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-2"
            placeholder="Tiêu đề mới"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
          </Button>
        </Form>
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        {result && <pre className="bg-light p-2 mt-2 border">{JSON.stringify(result.data, null, 2)}</pre>}
      </Card.Body>
    </Card>
  );
}