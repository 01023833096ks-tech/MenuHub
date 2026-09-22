const Base_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMeals = async (query = "") => {
  const response = await fetch(`${Base_URL}/search.php?s=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = await response.json();
  return data.meals || [];
};

export const fetchCategories = async () => {
  const response = await fetch(`${Base_URL}/categories.php`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.categories || [];
};

export const fetchMealById = async (id) => {
  const response = await fetch(`${Base_URL}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch meal details");
  }
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};
