export const COURSES = [
  { code: 'PRF192', name: 'Programming Fundamentals', credits: 3, semester: 1, desc: 'Cơ bản về tư duy lập trình với C.' },
  { code: 'WED201c', name: 'Web Design', credits: 3, semester: 2, desc: 'Thiết kế trang web chuẩn HTML/CSS/JS.' },
  { code: 'PRO192', name: 'Object-Oriented Programming', credits: 3, semester: 2, desc: 'Lập trình hướng đối tượng với Java.' },
  { code: 'FER202', name: 'Front-End Web Development with React', credits: 3, semester: 4, desc: 'Xây dựng Web SPA với React.' },
  { code: 'SWP391', name: 'Software Development Project', credits: 5, semester: 5, desc: 'Dự án thực tế làm việc theo nhóm.' },
];

export const findCourse = (code) => {
  if (!code) return null;
  return COURSES.find((c) => c.code.toLowerCase() === code.toLowerCase());
};