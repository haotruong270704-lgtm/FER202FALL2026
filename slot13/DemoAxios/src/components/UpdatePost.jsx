import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setPost(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleUpdate = () => {
    axios
      .put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      })
      .then((response) => setResult({ status: response.status, data: response.data }))
      .catch((err) => setError(err.message));
  };

  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!post) return <div className="text-info text-center">Loading post #1...</div>;

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary fs-4 text-center mb-3">Bài 2.3: PUT – Cập nhật bài viết #1</h2>
      <div className="mb-2">
        <label className="form-label fw-bold">Title:</label>
        <input
          className="form-control"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label className="form-label fw-bold">Body:</label>
        <textarea
          className="form-control"
          rows={3}
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
      </div>
      <button className="btn btn-warning text-white w-100 mb-3" onClick={handleUpdate}>
        Cập nhật (PUT)
      </button>

      {result && (
        <div className="alert alert-info">
          <p className="mb-1"><strong>Status:</strong> {result.status}</p>
          <pre className="mb-0 bg-light p-2 rounded">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;