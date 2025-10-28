🧑‍🍳 Recipe Ideas – Smart Recipe Finder

Recipe Ideas is a sleek, modern recipe discovery app built with React, designed for busy professionals like Taylor who want to quickly find recipes based on what they have, how they feel, or how much time they’ve got.

🚀 Features

Smart Ingredient Matching: Enter multiple ingredients and instantly get recipe suggestions.

Mood & Time Filtering: Find comfort food, quick meals, or elaborate dishes based on mood and available time.

Detailed In-App Recipes: Fetch and display complete recipe details (ingredients, instructions, and YouTube tutorials) directly inside the app using TheMealDB’s lookup API.

Instant Restoration: Seamless back navigation using URL search params + Session Storage for state persistence.

Responsive Design: Works beautifully across devices.

Polished UI: Modern layout, clean typography, and smooth animations.

🧩 How It Works

Ingredient Input: Users enter one or more ingredients they have.

API Fetching: The app calls

https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}

for each ingredient.

Recipe Matching: Finds recipes that match one or more entered ingredients.

Detailed View: When a user clicks a recipe, the app fetches full details from

https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}

and displays them within the app (no redirect needed).

Session + URL State:

Stores search data in both URL params and sessionStorage.

Enables instant restoration of results on back navigation.

Makes searches shareable (e.g., /recipes?ingredients=chicken,tomato).

Prevents unnecessary API refetching and ensures a smoother user experience.

🛠 Tech Stack

Frontend: React (with Hooks)

Styling: CSS Modules (Component-scoped styles)

API: TheMealDB

State Persistence: URL search params + sessionStorage

Deployment: Ready for static hosting (Netlify, Vercel, etc.)

🧠 Why URL + SessionStorage?
Feature Benefit
URL Params Enables shareable, bookmarkable searches and smooth browser back/forward navigation.
SessionStorage Stores fetched results temporarily, preventing unnecessary API calls and ensuring instant restoration.
Combined Power Delivers a fast, resilient experience without complex global state or Redux setup.
