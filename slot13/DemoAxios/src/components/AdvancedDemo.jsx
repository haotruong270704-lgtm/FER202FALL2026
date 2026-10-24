import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AdvancedDemo = () => {
  const [postId, setPostId] = useState('1');
  const [postDetail, setPostDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Khởi tạo AbortController để hủy request nếu postId thay đổi liên tục
    const controller = new AbortController();

    const fetchPostAndComments = async () => {
      setLoading(true);
      setError(null);
      try {
        // Gọi song song 2 API bằng Promise.all
        const [postRes, commentsRes] = await Promise.all([
          axiosClient.get(`/posts/${postId}`, { signal: controller.signal }),
          axiosClient.get(`/posts/${postId}/comments`, { signal: controller.signal }),
        ]);

        setPostDetail(postRes);
        setComments(commentsRes);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostAndComments();
    }

    // Cleanup function: Hủy request cũ nếu người dùng gõ/chọn id mới
    return () => controller.abort();
  }, [postId]);

  return (
    <div className="card p-3 shadow-sm mb-4 bg-light border-primary">
      <h2 className="text-primary fs-4 text-center mb-3">
        Phần 3: Nâng cao (Axios Instance, Async/Await, AbortController)
      </h2>

      {/* Input chọn Post ID */}
      <div className="mb-3 mx-auto" style={{ maxWidth: '300px' }}>
        <label className="form-label fw-bold">Nhập Post ID (1 - 100):</label>
        <input
          type="number"
          min="1"
          max="100"
          className="form-control text-center"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
      </div>

      {loading && <div className="text-center text-info my-3">Đang tải dữ liệu...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {postDetail && !loading && (
        <div className="bg-white p-3 rounded border">
          <h4 className="text-success">{postDetail.title}</h4>
          <p>{postDetail.body}</p>

          <hr />
          <h5 className="text-secondary">Danh sách bình luận ({comments.length}):</h5>
          <ul className="list-group list-group-flush">
            {comments.slice(0, 3).map((c) => (
              <li key={c.id} className="list-group-item bg-transparent">
                <strong className="text-primary">{c.email}:</strong> {c.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvancedDemo;