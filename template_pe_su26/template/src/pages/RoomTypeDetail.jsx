import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Table, Button, Spinner, Alert, Badge } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { formatPriceRange } from '../utils/format'

export default function RoomTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [roomType, setRoomType] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        
        // TODO-10A: Sử dụng Promise.all để lấy danh sách loại phòng và tất cả các phòng
        const [roomTypes, allRooms] = await Promise.all([fetchRoomTypes(), fetchRooms()])
        
        const found = roomTypes.find((rt) => String(rt.id) === String(id))
        
        if (!found) {
          // Nếu không tìm thấy id hợp lệ → chuyển hướng tới trang 404
          navigate('/not-found', { replace: true })
          return
        }

        if (isMounted) {
          setRoomType(found)
          setRooms(allRooms.filter((r) => String(r.roomTypeId) === String(id)))
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load data.')
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [id, navigate])

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!roomType) return null

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        className="mb-3" 
        onClick={() => navigate('/room-types')}
      >
        ← Back to Room Types
      </Button>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title as="h3">{roomType.name}</Card.Title>
          <Card.Text className="text-muted">
            Total Rooms: <Badge bg="info">{rooms.length}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>

      <h5 className="mb-3">Rooms List</h5>
      {rooms.length === 0 ? (
        <Alert variant="info">No rooms found for this room type.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Floor</th>
              <th>View</th>
              <th>Price Range</th>
              <th>Last Renovated</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.floor}</td>
                <td>{room.view}</td>
                <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
                <td>{room.lastRenovated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}