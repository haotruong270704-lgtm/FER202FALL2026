import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function UpdatePostCard() {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getById('1', controller.signal);
        setPost(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err.userMessage);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await postApi.update('1', { ...post, title: post.title });
      setResult({ status: res.status, data: res.data });
    } catch (err) {
      setError(err.userMessage);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>3. PUT Update Post #1</strong></Card.Header>
      <Card.Body>
        {post && (
          <>
            <Form.Control
              className="mb-2"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <Button variant="warning" onClick={handleUpdate}>Cập nhật (PUT)</Button>
          </>
        )}
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        {result && <pre className="bg-light p-2 mt-2 border">{JSON.stringify(result.data, null, 2)}</pre>}
      </Card.Body>
    </Card>
  );
}