import React, { useState } from "react";
import "./TimeFilter.css";

const timeOptions = [
  { value: "all", label: "Any Time", icon: "⏰", max: 999 },
  { value: "quick", label: "Quick (< 20 min)", icon: "⚡", max: 20 },
  { value: "medium", label: "Medium (20-40 min)", icon: "🕐", max: 40 },
  { value: "long", label: "Elaborate (> 40 min)", icon: "🍽", max: 999 },
];

const TimeFilter = ({ selectedTime, onTimeChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="time-section">
      <div
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="section-title">
          <span className="icon">⏱</span>
          Cooking Time
        </h2>
        <div className="header-right">
          {selectedTime !== "all" && (
            <span className="selected-badge">
              {timeOptions.find((t) => t.value === selectedTime)?.label}
            </span>
          )}
          <span className={`arrow ${isExpanded ? "expanded" : ""}`}>▼</span>
        </div>
      </div>

      {isExpanded && (
        <div className="time-content">
          <div className="time-grid">
            {timeOptions.map((option) => (
              <button
                key={option.value}
                className={`time-card ${
                  selectedTime === option.value ? "active" : ""
                }`}
                onClick={() => onTimeChange(option.value)}
              >
                <span className="time-icon">{option.icon}</span>
                <span className="time-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeFilter;
