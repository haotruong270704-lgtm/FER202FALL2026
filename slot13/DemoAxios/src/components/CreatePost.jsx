import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setTitle('');
        setBody('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary fs-4 text-center mb-3">Bài 2.2: POST – Tạo bài viết mới</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tiêu đề (Title)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Nội dung (Body)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {result && (
        <div className="alert alert-success">
          <p className="mb-1"><strong>Status:</strong> {result.status}</p>
          <pre className="mb-0 bg-light p-2 rounded">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePost;