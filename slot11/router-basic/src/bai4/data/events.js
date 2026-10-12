export const EVENTS = [
  {
    id: 'e1',
    title: 'FPT TechDay 2026',
    date: '15/11/2026',
    location: 'Hội trường A - FPT University',
    speaker: 'Chuyên gia Công nghệ FPT',
    description: 'Hội thảo chia sẻ về xu hướng AI, Cloud và Phát triển phần mềm hiện đại.',
  },
  {
    id: 'e2',
    title: 'React & Frontend Workshop',
    date: '20/11/2026',
    location: 'Phòng Lab 302',
    speaker: 'Senior Frontend Developer',
    description: 'Workshop thực hành tối ưu hóa hiệu năng và React Router v7.',
  },
  {
    id: 'e3',
    title: 'Ngày hội Việc làm IT Job Fair',
    date: '05/12/2026',
    location: 'Sân trường FPT',
    speaker: 'Đại diện các Doanh nghiệp IT',
    description: 'Cơ hội ứng tuyển trực tiếp và phỏng vấn với các công ty công nghệ hàng đầu.',
  },
];

export const findEventById = (id) => EVENTS.find((e) => e.id === id);