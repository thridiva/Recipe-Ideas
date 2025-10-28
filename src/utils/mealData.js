// Estimated cooking times for common meals (in minutes)
export const mealTimes = {
  // Quick meals (< 20 minutes)
  "Chicken Salad": 15,
  "Tuna Salad": 10,
  "Greek Salad": 15,
  "Caprese Salad": 10,
  "Egg Fried Rice": 15,
  "Scrambled Eggs": 10,
  "French Toast": 15,
  Pancakes: 20,
  "Grilled Cheese": 10,
  Quesadilla: 15,
  "Spaghetti Aglio e Olio": 20,
  "Pasta Carbonara": 20,
  "Stir Fry": 15,
  Tacos: 20,
  Bruschetta: 15,

  // Medium meals (20-40 minutes)
  "Chicken Curry": 35,
  "Beef Stew": 40,
  "Spaghetti Bolognese": 30,
  "Chicken Alfredo": 30,
  "Pad Thai": 25,
  "Fried Rice": 25,
  "Chicken Fajitas": 30,
  "Beef Burrito": 30,
  Lasagne: 40,
  "Chicken Tikka Masala": 35,
  "Thai Green Curry": 30,
  "Chili Con Carne": 40,
  "Moroccan Chicken": 35,
  "Teriyaki Chicken": 25,
  "Sweet and Sour Chicken": 30,
  "Beef and Broccoli": 25,
  "Shrimp Scampi": 25,
  "Fish Tacos": 25,
  "Chicken Parmesan": 35,
  "Stuffed Peppers": 40,

  // Elaborate meals (> 40 minutes)
  "Beef Wellington": 90,
  "Roast Chicken": 75,
  "Beef Roast": 120,
  "Lamb Roast": 90,
  "Coq au Vin": 60,
  "Beef Bourguignon": 120,
  "Osso Buco": 90,
  Paella: 60,
  Risotto: 45,
  Biryani: 60,
  Moussaka: 90,
  "Shepherd's Pie": 60,
  Ratatouille: 50,
  Cassoulet: 120,
};

// Get estimated time for a meal (returns null if not found)
export const getEstimatedTime = (mealName) => {
  // Direct match
  if (mealTimes[mealName]) {
    return mealTimes[mealName];
  }

  // Partial match
  for (const [key, value] of Object.entries(mealTimes)) {
    if (mealName.includes(key) || key.includes(mealName)) {
      return value;
    }
  }

  // Default estimates based on keywords
  const lowerName = mealName.toLowerCase();
  if (lowerName.includes("salad") || lowerName.includes("sandwich")) {
    return 15;
  }
  if (lowerName.includes("soup") || lowerName.includes("stew")) {
    return 45;
  }
  if (lowerName.includes("roast") || lowerName.includes("baked")) {
    return 60;
  }
  if (lowerName.includes("pasta") || lowerName.includes("noodle")) {
    return 25;
  }
  if (lowerName.includes("curry") || lowerName.includes("stir fry")) {
    return 30;
  }

  return null; // Unknown
};

// Mood to category mapping
export const moodCategories = {
  all: "",
  comfort: "Beef",
  healthy: "Vegetarian",
  seafood: "Seafood",
  sweet: "Dessert",
  pasta: "Pasta",
  chicken: "Chicken",
};

// Time filter thresholds
export const timeThresholds = {
  all: 999,
  quick: 20,
  medium: 40,
  long: 999,
};

export const filterByTime = (recipes, timeFilter) => {
  if (timeFilter === "all") return recipes;

  //const threshold = timeThresholds[timeFilter];

  return recipes.filter((recipe) => {
    if (!recipe.estimatedTime) return true; // Include if time unknown

    if (timeFilter === "quick") {
      return recipe.estimatedTime < 20;
    } else if (timeFilter === "medium") {
      return recipe.estimatedTime >= 20 && recipe.estimatedTime <= 40;
    } else if (timeFilter === "long") {
      return recipe.estimatedTime > 40;
    }

    return true;
  });
};
