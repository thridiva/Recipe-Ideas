import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, estimatedTime, matchCount }) => {
  const navigate = useNavigate();

  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
        <div className="recipe-overlay">
          {estimatedTime && (
            <div className="time-badge">
              <span className="time-icon">⏱</span>
              {estimatedTime} min
            </div>
          )}
          {matchCount && (
            <div className="match-badge">
              <span className="match-icon">✓</span>
              {matchCount} ingredients
            </div>
          )}
        </div>
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <button onClick={handleViewRecipe} className="view-recipe-btn">
          View Recipe
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
