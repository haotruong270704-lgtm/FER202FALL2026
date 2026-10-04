import Container from 'react-bootstrap/Container';
import StepCounter from './usereducer/StepCounter';
import OrderTracker from './usereducer/OrderTracker';
import KanbanBoard from './usereducer/KanbanBoard';
import CourseWizard from './usereducer/CourseWizard';
import NotesBoard from './usereducer/NotesBoard';

export default function App() {
  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Slot 8 - useReducer & Context API</h2>
      <hr />
      <StepCounter />
      <hr />
      <OrderTracker />
      <hr />
      <KanbanBoard />
      <hr />
      <CourseWizard initialCourseId="react" />
      <hr />
      <NotesBoard />
    </Container>
  );
}