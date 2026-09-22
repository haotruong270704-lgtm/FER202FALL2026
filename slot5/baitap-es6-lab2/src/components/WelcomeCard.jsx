import Card from 'react-bootstrap/Card';

function WelcomeCard() {
  const fullName = 'Nguyễn Văn An';
  const birthYear = 2005;
  const currentYear = 2026;
  const major = 'Software Engineering';
  const hour = new Date().getHours();

  // Xác định buổi trong ngày (session khởi tạo là 'sáng', dùng if cập nhật thành 'chiều' nếu hour >= 12 và 'tối' nếu hour >= 18).
  let session = 'sáng';
  if (hour >= 12) {
    session = 'chiều';
  }
  if (hour >= 18) {
    session = 'tối';
  }

  // Tạo chuỗi lời chào greeting và tính toán age trực tiếp trong Template Literal: ${currentYear - birthYear} tuổi.
  const greeting = `Chào buổi ${session}, ${fullName}!`;

  // Tạo biến borderClass xác định màu viền: 'border-success' (khi age >= 18) hoặc 'border-warning' (khi age < 18).
  const borderClass = (currentYear - birthYear) >= 18 ? 'border-success' : 'border-warning';

  // Dựng giao diện bằng React-Bootstrap Card với className ghép bằng Template Literal
  return (
    <>
      <Card className={`shadow-sm ${borderClass}`} style={{ maxWidth: 400 }}>
        <Card.Body>
          <Card.Title>{greeting}</Card.Title>
          <Card.Text>
            You are {currentYear - birthYear} years old and studying {major}.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default WelcomeCard;