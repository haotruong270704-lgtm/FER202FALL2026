import axios from 'axios';

// 1. Khởi tạo instance với cấu hình mặc định
const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Chạy trước khi gửi request
axiosClient.interceptors.request.use(
  (config) => {
    console.log(`[API Call]: ${config.method.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Xử lý dữ liệu trả về & chuẩn hóa câu báo lỗi
axiosClient.interceptors.response.use(
  (response) => response.data, // Trả thẳng về response.data
  (error) => {
    let message = 'Đã có lỗi xảy ra';
    if (error.response) {
      if (error.response.status === 404) message = 'Không tìm thấy tài nguyên (404)';
      else if (error.response.status >= 500) message = 'Máy chủ bị lỗi (5xx)';
    } else if (error.code === 'ECONNABORTED') {
      message = 'Kết nối quá thời gian (timeout)';
    } else {
      message = 'Mất kết nối mạng hoặc không thể gọi server';
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;