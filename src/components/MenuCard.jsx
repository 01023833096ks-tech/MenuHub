import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function MenuCard({ meal }) {
  const { AddToCart } = useCart();
  return (
    <div className="menu-card">
      <Link to={`/menu/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      </Link>
      <div className="menu-card-content">
        <Link to={`/menu/${meal.idMeal}`}>
          <h3>{meal.strMeal}</h3>
        </Link>

        <div className="tags">
          <span className="badge category">{meal.strCategory}</span>
          <span className="badge area">{meal.strArea}</span>
        </div>

        <div className="card-footer">
          <span className="price">$20</span>
          <button
            className="add-btn"
            aria-label={`Add ${meal.strMeal} to cart`}
            onClick={() => AddToCart(meal)}
          ></button>
        </div>
      </div>
    </div>
  );
}
export default MenuCard;
