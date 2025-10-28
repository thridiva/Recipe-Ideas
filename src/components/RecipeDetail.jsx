import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to fetch recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="recipe-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-container">
        <div className="error-message">
          <h2>😕 {error || "Recipe not found"}</h2>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="recipe-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <span className="back-arrow">←</span> Back
      </button>

      <div className="recipe-detail-content">
        <div className="recipe-header">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-detail-image"
          />
          <div className="recipe-header-info">
            <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
            <div className="recipe-meta">
              {recipe.strCategory && (
                <span className="meta-badge category-badge">
                  🍽️ {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="meta-badge area-badge">
                  🌍 {recipe.strArea}
                </span>
              )}
            </div>
            {recipe.strTags && (
              <div className="recipe-tags">
                {recipe.strTags.split(",").map((tag, index) => (
                  <span key={index} className="tag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="recipe-body">
          <div className="ingredients-section">
            <h2 className="section-title">
              <span className="title-icon">📝</span>
              Ingredients
            </h2>
            <ul className="ingredients-list">
              {ingredients.map((item, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-bullet">•</span>
                  <span className="ingredient-measure">{item.measure}</span>
                  <span className="ingredient-name">{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2 className="section-title">
              <span className="title-icon">👨‍🍳</span>
              Instructions
            </h2>
            <div className="instructions-content">
              {recipe.strInstructions.split("\n").map((paragraph, index) => {
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="instruction-paragraph">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="video-section">
              <h2 className="section-title">
                <span className="title-icon">🎥</span>
                Video Tutorial
              </h2>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    recipe.strYoutube.split("v=")[1]
                  }`}
                  title="Recipe Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
