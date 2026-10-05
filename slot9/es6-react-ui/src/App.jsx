import TodoList from './components/TodoList';
import TodoFilterList from './components/TodoFilterList';

const App = () => (
  <div className="container my-4">
    <h3 className="mb-4">Bài 3: Quản lý Công việc (TodoList)</h3>
    <div className="row g-4">
      <div className="col-md-6">
        <h5>Bước 1: CRUD cơ bản</h5>
        <TodoList/>
      </div>
      <div className="col-md-6">
        <h5>Bước 2: Lọc & Thống kê</h5>
        <TodoFilterList/>
      </div>
    </div>
  </div>
);

export default App;