import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function PostListCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getAll({}, controller.signal);
        setPosts(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err.userMessage);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>1. GET Posts List</strong></Card.Header>
      <Card.Body>
        {loading && <Spinner animation="border" size="sm" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && (
          <ListGroup variant="flush">
            {posts.map((p) => (
              <ListGroup.Item key={p.id}>#{p.id} – {p.title}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}