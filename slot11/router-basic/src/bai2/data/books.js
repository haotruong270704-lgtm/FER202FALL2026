export const BOOKS = [
  {
    id: 'b1',
    title: 'Lập trình ReactJS từ cơ bản đến nâng cao',
    author: 'Nguyễn Văn A',
    category: 'Lập trình',
    publisher: 'NXB Lập Trình',
    year: 2023,
    status: 'Sẵn có',
    description: 'Sách hướng dẫn chi tiết về React Router, Redux Toolkit và React Hooks.',
  },
  {
    id: 'b2',
    title: 'Cấu trúc dữ liệu và Giải thuật với Java',
    author: 'Trần Thị B',
    category: 'Khoa học máy tính',
    publisher: 'NXB Giáo Dục',
    year: 2022,
    status: 'Sẵn có',
    description: 'Kiến thức cốt lõi về danh sách liên kết, cây, đồ thị và sắp xếp.',
  },
  {
    id: 'b3',
    title: 'Thiết kế giao diện UI/UX chuẩn Figma',
    author: 'Lê Văn C',
    category: 'Thiết kế',
    publisher: 'NXB Mỹ Thuật',
    year: 2024,
    status: 'Đã mượn',
    description: 'Hướng dẫn xây dựng Design System và Prototype chuyên nghiệp.',
  },
  {
    id: 'b4',
    title: 'Nhập môn Cơ sở dữ liệu SQL & NoSQL',
    author: 'Phạm Minh D',
    category: 'Lập trình',
    publisher: 'NXB Kỹ Thuật',
    year: 2021,
    status: 'Sẵn có',
    description: 'Tìm hiểu về PostgreSQL, MongoDB và tối ưu hóa truy vấn.',
  },
  {
    id: 'b5',
    title: 'Quản trị dự án Phần mềm Agile/Scrum',
    author: 'Hoàng Anh E',
    category: 'Quản lý',
    publisher: 'NXB Tri Thức',
    year: 2023,
    status: 'Sẵn có',
    description: 'Quy trình phát triển phần mềm hiện đại cho các team công nghệ.',
  },
];

export const CATEGORIES = ['Tất cả', 'Lập trình', 'Khoa học máy tính', 'Thiết kế', 'Quản lý'];

export const findBookById = (id) => BOOKS.find((b) => b.id === id);