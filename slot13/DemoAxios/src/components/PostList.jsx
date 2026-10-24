import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: { userId: 1, _limit: 5 }, // Chuyển thành URL ?userId=1&_limit=5
      })
      .then((response) => setPosts(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary">Bài 2.1: GET – Danh sách 5 bài viết của user 1</h2>
      <ul className="list-group list-group-flush">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            <strong>#{post.id}</strong> – {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;