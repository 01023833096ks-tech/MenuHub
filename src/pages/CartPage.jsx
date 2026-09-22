import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const {
    cartItems,
    IncreaseQuantity,
    DecreaseQuantity,
    RemoveFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  const handleChekout = () => {
    alert("Order Placed!");
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="state-message">
        <h2>Your cart is empty</h2>
        <p>Looks like you have not added anything yet.</p>
        <Link to="/" className="continue-btn">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.idMeal} className="cart-item">
            <img src={item.strMealThumb} alt={item.strMeal} />
            <div className="cart-item-info">
              <h4>{item.strMeal}</h4>
              <p>{item.price.toFixed(2)}</p>
            </div>

            <div className="quantity-controls">
              <button
                aria-label={`Decrease ${item.strMeal} quantity`}
                onClick={() => DecreaseQuantity(item.idMeal)}
              ></button>
              <span>{item.quantity}</span>
              <button
                aria-label={`Increase ${item.strMeal} quantity`}
                onClick={() => IncreaseQuantity(item.idMeal)}
              ></button>
            </div>

            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => RemoveFromCart(item.idMeal)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="clear-btn"
          onClick={clearCart}
          aria-label="Clear cart"
        ></button>
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Total : </span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn" onClick={handleChekout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
