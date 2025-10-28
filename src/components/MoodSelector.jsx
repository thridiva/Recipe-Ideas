import React, { useState } from "react";
import "./MoodSelector.css";

const moods = [
  { value: "all", label: "All Cuisines", icon: "🌎", category: "" },
  { value: "comfort", label: "Comfort Food", icon: "🍲", category: "Beef" },
  {
    value: "healthy",
    label: "Healthy & Light",
    icon: "🥗",
    category: "Vegetarian",
  },
  { value: "seafood", label: "Seafood Lover", icon: "🦐", category: "Seafood" },
  { value: "sweet", label: "Sweet Treats", icon: "🍰", category: "Dessert" },
  { value: "pasta", label: "Pasta Craving", icon: "🍝", category: "Pasta" },
  {
    value: "chicken",
    label: "Chicken Dishes",
    icon: "🍗",
    category: "Chicken",
  },
];

const MoodSelector = ({ selectedMood, onMoodChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mood-section">
      <div
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="section-title">
          <span className="icon">😋</span>
          Mood / Preference
        </h2>
        <div className="header-right">
          {selectedMood !== "all" && (
            <span className="selected-badge">
              {moods.find((m) => m.value === selectedMood)?.label}
            </span>
          )}
          <span className={`arrow ${isExpanded ? "expanded" : ""}`}>▼</span>
        </div>
      </div>

      {isExpanded && (
        <div className="mood-content">
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`mood-card ${
                  selectedMood === mood.value ? "active" : ""
                }`}
                onClick={() => onMoodChange(mood.value)}
              >
                <span className="mood-icon">{mood.icon}</span>
                <span className="mood-label">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
