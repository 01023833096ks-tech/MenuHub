function CategoryFilter({ categories, selectedCategory, onSelectedCategory }) {
  return (
    <div className="category-filter">
      <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => onSelectedCategory("All")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          className={selectedCategory === cat.strCategory ? "active" : ""}
          onClick={() => onSelectedCategory(cat.strCategory)}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
