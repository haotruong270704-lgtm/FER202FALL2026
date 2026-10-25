import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Button, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';

export default function DeletePostCard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getAll({}, controller.signal);
        setPosts(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err.userMessage);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const handleDelete = async (id) => {
    try {
      await postApi.remove(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.userMessage);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>5. DELETE Post</strong></Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <ListGroup variant="flush">
          {posts.map((p) => (
            <ListGroup.Item key={p.id} className="d-flex justify-content-between align-items-center">
              <span>#{p.id} – {p.title}</span>
              <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Xóa</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}