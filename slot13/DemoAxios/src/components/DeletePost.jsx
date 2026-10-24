import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then((response) => setPosts(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    axios
      .delete(`${API}/${id}`)
      .then((response) => {
        setPosts(posts.filter((p) => p.id !== id));
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
      })
      .catch((err) => setError(err.message));
  };

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary fs-4 text-center mb-3">Bài 2.5: DELETE – Xóa bài viết</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span><strong>#{post.id}</strong> – {post.title}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(post.id)}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;