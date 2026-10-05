import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => (
  <div className="container my-4">
    <h3 className="mb-4">Bài 2: Quản lý Form & Validation</h3>
    <div className="row g-4">
      <div className="col-md-6">
        <LoginForm />
      </div>
      <div className="col-md-6">
        <RegisterForm />
      </div>
    </div>
  </div>
);

export default App;