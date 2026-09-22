import { useState, useEffect } from "react";
import { fetchMeals, fetchCategories } from "../api/mealApi";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MenuCard from "../components/MenuCard";

function Menu() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [mealsData, categoriesData] = await Promise.all([
          fetchMeals(""),
          fetchCategories(),
        ]);
        setMeals(mealsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "All" || meal.strCategory === selectedCategory;
    const matchesSearch = meal.strMeal
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">
      <h1>MenuHub</h1>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectedCategory={setSelectedCategory}
        />
      </div>

      {loading && (
        <div className="state-message">Loading delicious menu...</div>
      )}
      {error && <div className="state-message">Error: {error} </div>}

      {!loading && !error && filteredMeals.length === 0 && (
        <div className="state-message">No meals match your criteria.</div>
      )}

      {!loading && !error && filteredMeals.length > 0 && (
        <div className="menu-grid">
          {filteredMeals.map((meal) => (
            <MenuCard key={meal.idMeal} meal={meal}></MenuCard>
          ))}
        </div>
      )}
    </div>
  );
}
export default Menu;
