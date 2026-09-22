import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarApp, FooterApp } from './components';
import HomePage from './pages/HomePage';
import { cartItems } from './data/cart';

function App() {
  // Tính tổng số lượng hàng trong giỏ truyền cho NavbarApp
  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-light-subtle">
      {/* Header (Navbar) */}
      <NavbarApp totalCartItems={totalCartQuantity} />

      {/* Main Content: HomePage */}
      <main className="container my-4 flex-grow-1">
        <HomePage />
      </main>

      {/* Footer */}
      <FooterApp />
    </div>
  );
}

export default App;