// Hàm định dạng số tiền sang định dạng VNĐ (Ví dụ: 150000 -> 150.000 ₫)
export const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};