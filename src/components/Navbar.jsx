import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { totalQuantity } = useCart();

  return (
    <header className="nav-bar">
      <Link to="/" className="brand-logo">
        MenuHub{" "}
      </Link>
      <nav>
        <Link to="/Cart" className="cart-link">
          Cart{" "}
          {totalQuantity > 0 && (
            <span className="cart-badge">{totalQuantity}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}
