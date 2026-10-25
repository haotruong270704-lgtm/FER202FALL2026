import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Card, Table, Alert } from 'react-bootstrap';

export default function RequestConfigCard() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosClient({ method: 'get', url: '/posts', timeout: 5000 });
        setInfo({ status: res.status, duration: res.duration, data: res.data });
      } catch (err) {
        setError(err.userMessage);
      }
    };
    load();
  }, []);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>6. Request Config Demo</strong></Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {info && (
          <Table size="sm" bordered>
            <tbody>
              <tr><th>Status</th><td>{info.status}</td></tr>
              <tr><th>Thời gian</th><td>{info.duration} ms</td></tr>
              <tr><th>Số bài</th><td>{info.data.length}</td></tr>
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}