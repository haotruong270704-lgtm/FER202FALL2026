import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getErrorMessage(err) {
  if (err.code === 'ECONNABORTED') return 'Kết nối quá chậm (timeout)';
  if (err.response) {
    const { status } = err.response;
    if (status === 404) return 'Không tìm thấy dữ liệu (404)';
    if (status >= 500) return `Máy chủ lỗi (${status})`;
    return `Yêu cầu không hợp lệ (${status})`;
  }
  if (err.request) return 'Không kết nối được server';
  return err.message;
}

axiosClient.interceptors.request.use((config) => {
  config.metadata = { start: performance.now() };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    response.duration = Math.round(performance.now() - response.config.metadata.start);
    return response;
  },
  (error) => {
    if (!axios.isCancel(error)) {
      error.userMessage = getErrorMessage(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;