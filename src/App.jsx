import Menu from "./pages/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import MealDetail from "./pages/MealDetail";
import { CartPage } from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-shell">
          <Navbar />
          <main className="app-container">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<MealDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Menu />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
