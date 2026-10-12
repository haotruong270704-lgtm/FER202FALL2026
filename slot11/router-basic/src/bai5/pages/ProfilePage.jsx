import { useAuth } from '../context/AuthContext';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '600px' }} className="mx-auto shadow-sm">
        <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Trang cá nhân (Protected)</h5>
          <Badge bg={user?.role === 'Admin' ? 'danger' : 'success'}>
            {user?.role}
          </Badge>
        </Card.Header>
        <Card.Body className="p-4">
          <h4 className="mb-3">Xin chào, {user?.name}! 👋</h4>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email liên hệ:</strong> {user?.email}</p>
          <p><strong>Quyền hạn:</strong> {user?.role}</p>

          <hr className="my-4" />

          <div className="d-flex justify-content-end gap-2">
            <Button variant="danger" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};