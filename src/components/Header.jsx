import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">🍳</div>
          <h1 className="logo-text">Recipe Ideas</h1>
        </div>
        <p className="tagline">Taylor's Kitchen Assistant</p>
      </div>
      <div className="header-gradient"></div>
    </header>
  );
};

export default Header;
