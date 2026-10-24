import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h2 className="text-secondary">Phần 1: Axios Demo (GET /posts/1)</h2>
      {data ? (
        <div>
          <h4 className="text-success">{data.title}</h4>
          <p>{data.body}</p>
        </div>
      ) : (
        <div className="text-info">Loading...</div>
      )}
    </div>
  );
};

export default AxiosDemo;