import React, { useState } from "react";
import "./IngredientInput.css";

const IngredientInput = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputValue.trim() &&
      !ingredients.includes(inputValue.trim().toLowerCase())
    ) {
      onAddIngredient(inputValue.trim().toLowerCase());
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="ingredient-section">
      <div className="section-header expanded">
        <h2 className="section-title">
          <span className="icon">🥗</span>
          Ingredients
        </h2>
        <span className="badge">{ingredients.length}</span>
      </div>

      <div className="ingredient-content">
        <form onSubmit={handleSubmit} className="ingredient-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an ingredient (e.g., chicken, tomato)..."
            className="ingredient-input"
          />
          <button type="submit" className="add-button">
            <span className="plus-icon">+</span>
          </button>
        </form>

        <div className="ingredients-list">
          {ingredients.length === 0 ? (
            <p className="empty-state">
              Start adding ingredients to discover amazing recipes!
            </p>
          ) : (
            ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-chip">
                <span className="chip-text">{ingredient}</span>
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="chip-remove"
                  aria-label={`Remove ${ingredient}`}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;
