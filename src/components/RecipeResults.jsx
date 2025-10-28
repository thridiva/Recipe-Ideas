import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeResults.css";

const RecipeResults = ({ recipes, loading, error }) => {
  if (loading) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            <span className="icon">🔍</span>
            Finding Your Perfect Recipes...
          </h2>
        </div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">
            Searching through thousands of delicious recipes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            <span className="icon">⚠</span>
            Oops!
          </h2>
        </div>
        <div className="error-container">
          <p className="error-text">{error}</p>
          <p className="error-subtext">
            Please try again with different ingredients.
          </p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            <span className="icon">👨‍🍳</span>
            Ready to Cook?
          </h2>
        </div>
        <div className="empty-container">
          <div className="empty-icon">🍽</div>
          <p className="empty-text">
            Add some ingredients to discover amazing recipes!
          </p>
          <p className="empty-subtext">
            Start by typing ingredients like chicken, tomato, or pasta
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <h2 className="results-title">
          <span className="icon">✨</span>
          Your Recipe Suggestions
        </h2>
        <span className="results-count">{recipes.length} recipes found</span>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            estimatedTime={recipe.estimatedTime}
            matchCount={recipe.matchCount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeResults;
