import React, { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = () => {
    axios
      .patch('https://jsonplaceholder.typicode.com/posts/1', { title })
      .then((response) => setResult({ status: response.status, data: response.data }))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary fs-4 text-center mb-3">Bài 2.4: PATCH – Sửa Tiêu đề bài viết #1</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tiêu đề mới..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn btn-info text-white"
          onClick={handlePatch}
          disabled={!title.trim()}
        >
          Cập nhật (PATCH)
        </button>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {result && (
        <div className="alert alert-info">
          <p className="mb-1"><strong>Status:</strong> {result.status}</p>
          <pre className="mb-0 bg-light p-2 rounded">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PatchPost;