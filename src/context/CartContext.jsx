import { useState } from "react";
import { createContext, useContext } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const AddToCart = (meal) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.idMeal === meal.idMeal,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.idMeal === meal.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      const price = meal.price || 20;
      return [...prevItems, { ...meal, price, quantity: 1 }];
    });
  };

  const RemoveFromCart = (idMeal) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.idMeal !== idMeal),
    );
  };

  const IncreaseQuantity = (idMeal) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.idMeal === idMeal
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const DecreaseQuantity = (idMeal) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.idMeal === idMeal
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        AddToCart,
        RemoveFromCart,
        IncreaseQuantity,
        DecreaseQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
