import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Alert, Spinner } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function AxiosDemoCard() {
  const [postId, setPostId] = useState('1');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await postApi.getById(postId, controller.signal);
        setPost(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err.userMessage);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [postId]);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>7. GET Single Post (AbortController)</strong></Card.Header>
      <Card.Body>
        <Form.Control
          type="number"
          className="mb-2"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        {loading && <Spinner animation="border" size="sm" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && post && (
          <div>
            <h5>#{post.id} – {post.title}</h5>
            <p>Views: {post.views}</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}