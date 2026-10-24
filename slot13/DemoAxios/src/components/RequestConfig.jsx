import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: { _page: 1, _limit: 3 },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer demo-token-123',
      },
      timeout: 5000,
    })
      .then((response) => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED') setError('Request quá thời gian (timeout)');
        else if (err.response) setError(`Server trả lỗi ${err.response.status}`);
        else setError(err.message);
      });
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!info) return <div className="text-info text-center">Loading...</div>;

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary fs-4 text-center mb-3">Bài 2.6: Cấu hình Request chi tiết</h2>
      <p className="mb-1"><strong>Status:</strong> {info.status}</p>
      <p className="mb-1"><strong>Content-Type:</strong> {info.contentType}</p>
      <p className="mb-2"><strong>Tổng số bài viết (x-total-count):</strong> {info.total}</p>
      <ul className="list-group">
        {info.data.map((p) => (
          <li key={p.id} className="list-group-item">{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestConfig;