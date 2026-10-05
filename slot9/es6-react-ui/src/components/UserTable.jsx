import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { usersData } from '../data/users';

const UserTable = () => {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');

  // Thay đổi trạng thái Active / Inactive
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  // Derived State: Lọc theo từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Quản lý người dùng</h4>
      
      <Form.Control
        type="text"
        placeholder="Tìm kiếm theo tên, email, vai trò..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table bordered hover responsive align="middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th className="text-center">Trạng thái</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                Không tìm thấy người dùng
              </td>
            </tr>
          ) : (
            filteredUsers.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td className="fw-bold">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <Badge bg={u.role === 'Admin' ? 'danger' : u.role === 'Editor' ? 'warning' : 'secondary'}>
                    {u.role}
                  </Badge>
                </td>
                <td className="text-center">
                  <Badge bg={u.status === 'Active' ? 'success' : 'dark'}>
                    {u.status}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant={u.status === 'Active' ? 'outline-danger' : 'outline-success'}
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === 'Active' ? 'Khóa' : 'Kích hoạt'}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;