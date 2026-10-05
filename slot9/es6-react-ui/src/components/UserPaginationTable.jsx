import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { usersData } from '../data/users';

const ITEMS_PER_PAGE = 3;

const UserPaginationTable = () => {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  // 1. Derived State: Lọc danh sách theo từ khóa
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Derived State: Tính toán phân trang
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Quản lý người dùng (Có phân trang)</h4>

      <Form.Control
        type="text"
        placeholder="Tìm kiếm theo tên, email, vai trò..."
        className="mb-3"
        value={search}
        onChange={handleSearchChange}
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
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                Không tìm thấy người dùng phù hợp
              </td>
            </tr>
          ) : (
            paginatedUsers.map((u, index) => (
              <tr key={u.id}>
                <td>{startIndex + index + 1}</td>
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

      {/* Điều hướng Phân trang */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <small className="text-muted">
            Hiển thị {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} trên tổng số {filteredUsers.length} người dùng
          </small>

          <Pagination className="mb-0">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}

            <Pagination.Next onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UserPaginationTable;