import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function PatchPostCard() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = async () => {
    try {
      const res = await postApi.patch('1', { title: title.trim() });
      setResult({ status: res.status, data: res.data });
    } catch (err) {
      setError(err.userMessage);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>4. PATCH Post #1 Title</strong></Card.Header>
      <Card.Body>
        <Form.Control
          className="mb-2"
          placeholder="Tiêu đề cập nhật..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="info" className="text-white" onClick={handlePatch}>PATCH</Button>
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        {result && <pre className="bg-light p-2 mt-2 border">{JSON.stringify(result.data, null, 2)}</pre>}
      </Card.Body>
    </Card>
  );
}