import { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms, deleteRoomType } from '../api/roomApi'

export default function ManageRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetName, setTargetName] = useState('')
  const [deleteError, setDeleteError] = useState(null)

  const loadData = () => {
    fetchRoomTypes()
      .then(setRoomTypes)
      .catch(console.error)
  }

  useEffect(() => {
    loadData()
  }, [])

  // TODO-10B: Kiểm tra xem RoomType có đang được sử dụng trước khi cho phép xóa
  const handleDeleteClick = async (id, name) => {
    setTargetId(id)
    setTargetName(name)
    
    const rooms = await fetchRooms()
    const inUse = rooms.some((r) => String(r.roomTypeId) === String(id))
    
    if (inUse) {
      setDeleteError(`Room type "${name}" is currently in use and cannot be deleted.`)
    } else {
      setDeleteError(null)
    }
    
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteError) {
      // Nếu đang bị lỗi inUse → Nút "OK" chỉ đơn thuần đóng Modal, KHÔNG thực hiện xóa
      setShowModal(false)
      return
    }

    try {
      await deleteRoomType(targetId)
      setShowModal(false)
      loadData() // Cập nhật lại danh sách sau khi xóa thành công
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="py-4">
      <h2>Manage Room Types</h2>
      
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes.map((rt) => (
            <tr key={rt.id}>
              <td>{rt.id}</td>
              <td>{rt.name}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDeleteClick(rt.id, rt.name)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal xác nhận hoặc báo lỗi không cho xóa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{deleteError ? 'Cannot Delete' : 'Confirm Delete'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError ? (
            <Alert variant="danger" className="mb-0">{deleteError}</Alert>
          ) : (
            `Are you sure you want to delete ${targetName}?`
          )}
        </Modal.Body>
        <Modal.Footer>
          {deleteError ? (
            <Button variant="primary" onClick={() => setShowModal(false)}>
              OK
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  )
}