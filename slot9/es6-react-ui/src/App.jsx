import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import MiniCart from './components/MiniCart';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import TodoFilterList from './components/TodoFilterList';
import ProductFilter from './components/ProductFilter';
import ProductSortList from './components/ProductSortList';
import UserTable from './components/UserTable';
import UserPaginationTable from './components/UserPaginationTable';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">Lab 4: React Hooks Exercises</h1>

      {/* Bài 1: Giỏ hàng */}
      <section className="mb-5">
        <h2>Bài 1: Giỏ hàng (QuantityPicker & MiniCart)</h2>
        <MiniCart />
      </section>

      <hr />

      {/* Bài 2: Form */}
      <section className="my-5">
        <h2>Bài 2: Form Validation</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <LoginForm />
          </div>
          <div className="col-md-6 mb-3">
            <RegisterForm />
          </div>
        </div>
      </section>

      <hr />

      {/* Bài 3: Todo List */}
      <section className="my-5">
        <h2>Bài 3: Todo List</h2>
        <TodoFilterList />
      </section>

      <hr />

      {/* Bài 4: Sản phẩm */}
      <section className="my-5">
        <h2>Bài 4: Lọc & Sắp xếp Sản phẩm</h2>
        <ProductSortList />
      </section>

      <hr />

      {/* Bài 5: Người dùng */}
      <section className="my-5">
        <h2>Bài 5: Quản lý Người dùng</h2>
        <UserPaginationTable />
      </section>
    </div>
  );
}

export default App;