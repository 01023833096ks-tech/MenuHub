import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMealById } from "../api/mealApi";
import { useCart } from "../context/CartContext";

export default function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { AddToCart } = useCart();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMeal() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMealById(id);
        if (!data) {
          setError("Meal not found");
        } else {
          setMeal(data);
        }
      } catch (err) {
        setError(err.message || "Error fetching meal details");
      } finally {
        setLoading(false);
      }
    }
    loadMeal();
  }, [id]);

  if (loading)
    return <div className="state-message">Loading meal details...</div>;
  if (error) return <div className="state-message">Error : {error}</div>;
  if (!meal) return null;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back to Menu
      </button>

      <div className="detail-container">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="detail-image"
        />

        <div className="detail-info">
          <h2>{meal.strMeal}</h2>
          <div className="tags">
            <span className="badge category">{meal.strCategory}</span>
            <span className="badge area">{meal.strArea}</span>
          </div>
          <p className="detail-price">Price : 120 L.E</p>
          <button className="add-btn large" onClick={() => AddToCart(meal)}>
            Add to Cart
          </button>

          <h3>Instructions</h3>
          <p className="instructions">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}
