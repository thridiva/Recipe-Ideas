import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import IngredientInput from "./components/IngredientInput";
import MoodSelector from "./components/MoodSelector";
import TimeFilter from "./components/TimeFilter";
import RecipeResults from "./components/RecipeResults";
import RecipeDetail from "./components/RecipeDetail";
import {
  getEstimatedTime,
  filterByTime,
  moodCategories,
} from "./utils/mealData";
import "./App.css";

function RecipeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ingredients, setIngredients] = useState([]);
  const [selectedMood, setSelectedMood] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize state from URL params or sessionStorage on mount
  useEffect(() => {
    const urlIngredients = searchParams.get("ingredients");
    const urlMood = searchParams.get("mood");
    const urlTime = searchParams.get("time");

    // Try URL first, then sessionStorage
    if (urlIngredients) {
      setIngredients(urlIngredients.split(","));
      setSelectedMood(urlMood || "all");
      setSelectedTime(urlTime || "all");
    } else {
      // Restore from sessionStorage if available
      const savedState = sessionStorage.getItem("recipeSearchState");
      if (savedState) {
        const {
          ingredients: saved,
          mood,
          time,
          recipes: savedRecipes,
        } = JSON.parse(savedState);
        if (saved && saved.length > 0) {
          setIngredients(saved);
          setSelectedMood(mood || "all");
          setSelectedTime(time || "all");
          // Restore recipes to avoid refetching
          if (savedRecipes && savedRecipes.length > 0) {
            setRecipes(savedRecipes);
          }
        }
      }
    }
  }, []);

  // Update URL params whenever filters change
  useEffect(() => {
    if (ingredients.length > 0) {
      const params = new URLSearchParams();
      params.set("ingredients", ingredients.join(","));
      if (selectedMood !== "all") params.set("mood", selectedMood);
      if (selectedTime !== "all") params.set("time", selectedTime);
      setSearchParams(params, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [ingredients, selectedMood, selectedTime]);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (ingredients.length > 0 || recipes.length > 0) {
      sessionStorage.setItem(
        "recipeSearchState",
        JSON.stringify({
          ingredients,
          mood: selectedMood,
          time: selectedTime,
          recipes,
        })
      );
    }
  }, [ingredients, selectedMood, selectedTime, recipes]);

  // Fetch recipes when ingredients change
  useEffect(() => {
    if (ingredients.length === 0) {
      setRecipes([]);
      setError(null);
      sessionStorage.removeItem("recipeSearchState");
      return;
    }

    // Don't fetch if we already have recipes (restored from sessionStorage)
    if (recipes.length > 0) {
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch meals for each ingredient entered
        const allMealPromises = ingredients.map((ingredient) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(allMealPromises);

        // Combine and track match count
        const mealMatches = {};

        results.forEach((result, index) => {
          if (result.meals) {
            result.meals.forEach((meal) => {
              if (!mealMatches[meal.idMeal]) {
                mealMatches[meal.idMeal] = {
                  ...meal,
                  matchCount: 0,
                  ingredients: [],
                };
              }
              mealMatches[meal.idMeal].matchCount++;
              mealMatches[meal.idMeal].ingredients.push(ingredients[index]);
            });
          }
        });

        // Convert to array
        let matchedMeals = Object.values(mealMatches);

        // ✅ Only include meals that include ALL entered ingredients
        matchedMeals = matchedMeals.filter(
          (meal) => meal.matchCount === ingredients.length
        );

        // Add estimated cooking times
        matchedMeals = matchedMeals.map((meal) => ({
          ...meal,
          estimatedTime: getEstimatedTime(meal.strMeal),
        }));

        // Handle empty results
        if (matchedMeals.length === 0) {
          setError(
            "No recipes found that include all these ingredients. Try removing one or two!"
          );
          setRecipes([]);
        } else {
          setRecipes(matchedMeals);
        }
      } catch (err) {
        console.error(err);
        setError(
          "Failed to fetch recipes. Please check your internet connection."
        );
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls slightly
    const timeoutId = setTimeout(fetchRecipes, 500);
    return () => clearTimeout(timeoutId);
  }, [ingredients]);

  // Apply filters for mood and cooking time
  const getFilteredRecipes = () => {
    let filtered = [...recipes];

    // Mood-based filtering
    if (selectedMood !== "all") {
      const category = moodCategories[selectedMood];
      if (category) {
        filtered = filtered.filter((recipe) => {
          const name = recipe.strMeal.toLowerCase();
          if (selectedMood === "comfort")
            return (
              name.includes("beef") ||
              name.includes("stew") ||
              name.includes("roast")
            );
          if (selectedMood === "healthy")
            return (
              name.includes("salad") ||
              name.includes("vegetarian") ||
              name.includes("grilled")
            );
          if (selectedMood === "seafood")
            return (
              name.includes("fish") ||
              name.includes("shrimp") ||
              name.includes("seafood") ||
              name.includes("prawn") ||
              name.includes("salmon")
            );
          if (selectedMood === "sweet")
            return (
              name.includes("cake") ||
              name.includes("cookie") ||
              name.includes("dessert") ||
              name.includes("sweet")
            );
          if (selectedMood === "pasta")
            return (
              name.includes("pasta") ||
              name.includes("spaghetti") ||
              name.includes("noodle")
            );
          if (selectedMood === "chicken") return name.includes("chicken");
          return true;
        });
      }
    }

    // Time filter
    filtered = filterByTime(filtered, selectedTime);

    return filtered;
  };

  // Handlers
  const handleAddIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient];
      setIngredients(newIngredients);
      // Clear recipes so they refetch with new ingredient
      setRecipes([]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    const newIngredients = ingredients.filter((i) => i !== ingredient);
    setIngredients(newIngredients);
    // Clear recipes so they refetch
    setRecipes([]);
  };

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const filteredRecipes = getFilteredRecipes();

  return (
    <>
      <Header />

      <main className="main-content">
        <div className="container">
          <div className="filters-section">
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />

            <MoodSelector
              selectedMood={selectedMood}
              onMoodChange={handleMoodChange}
            />

            <TimeFilter
              selectedTime={selectedTime}
              onTimeChange={handleTimeChange}
            />
          </div>

          <RecipeResults
            recipes={filteredRecipes}
            loading={loading}
            error={error}
          />
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Recipe Ideas</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
