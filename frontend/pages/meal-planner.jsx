import { useState, useEffect } from "react";
import api from "../src/services/api";

export default function MealPlanner() {
  const [mealPlan, setMealPlan] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
    snacks: []
  });
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [mealSource, setMealSource] = useState("home"); // "home" or "restaurant"

  useEffect(() => {
    // Calculate total calories whenever meal plan changes
    const total = Object.values(mealPlan)
      .flat()
      .filter(Boolean)
      .reduce((sum, meal) => sum + (meal.calories || 0), 0);
    setTotalCalories(total);
  }, [mealPlan]);

  useEffect(() => {
    // Fetch nearby restaurants when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await api.get("/api/restaurants/nearby", {
              params: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                radius: 5
              }
            });
            setRestaurants(response.data);
          } catch (error) {
            console.error("Failed to fetch restaurants:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }

    // Fetch recipes
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await api.get("/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleAddMeal = (mealType) => {
    setSelectedMealType(mealType);
    setShowMealSelector(true);
  };

  const handleSelectMeal = (meal) => {
    setMealPlan(prev => ({
      ...prev,
      [selectedMealType]: meal
    }));
    setShowMealSelector(false);
  };

  const handleRemoveMeal = (mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: null
    }));
  };

  const MealCard = ({ meal, onRemove }) => {
    if (!meal) return null;
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-lg text-forest">{meal.name}</h4>
            <p className="text-gray-600 text-sm">{meal.calories} calories</p>
            <p className="text-gray-500 text-sm">
              {meal.isRestaurant ? meal.restaurant : "Home Cooked"}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ivory p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-forest">Meal Planner</h1>
          <div className="bg-white rounded-lg shadow px-4 py-2">
            <span className="text-gray-600">Total Calories: </span>
            <span className="font-bold text-forest">{totalCalories}</span>
          </div>
        </div>

        {/* Meal sections */}
        <div className="space-y-8">
          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div key={mealType} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-forest capitalize">{mealType}</h2>
                {!mealPlan[mealType] && (
                  <button
                    onClick={() => handleAddMeal(mealType)}
                    className="bg-forest text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Meal
                  </button>
                )}
              </div>
              
              {mealPlan[mealType] ? (
                <MealCard
                  meal={mealPlan[mealType]}
                  onRemove={() => handleRemoveMeal(mealType)}
                />
              ) : (
                <p className="text-gray-500 italic">No meal selected</p>
              )}
            </div>
          ))}
        </div>

        {/* Meal selector modal */}
        {showMealSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-forest">Select a Meal</h3>
                  <button
                    onClick={() => setShowMealSelector(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Source selector */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setMealSource("home")}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      mealSource === "home"
                        ? "bg-forest text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Home Cooking
                  </button>
                  <button
                    onClick={() => setMealSource("restaurant")}
                    className={`flex-1 py-2 px-4 rounded-lg ${
                      mealSource === "restaurant"
                        ? "bg-forest text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Restaurant
                  </button>
                </div>

                {/* Meal options */}
                <div className="grid gap-4">
                  {mealSource === "restaurant"
                    ? restaurants.map((restaurant) => (
                        <button
                          key={restaurant.id}
                          onClick={() => handleSelectMeal({
                            name: restaurant.name,
                            calories: restaurant.averageCalories,
                            isRestaurant: true,
                            restaurant: restaurant.name,
                            nutritionScore: restaurant.nutritionScore
                          })}
                          className="text-left p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <h4 className="font-semibold">{restaurant.name}</h4>
                          <p className="text-sm text-gray-600">
                            Average calories: {restaurant.averageCalories}
                          </p>
                          <p className="text-sm text-gray-600">
                            Nutrition score: {restaurant.nutritionScore}/10
                          </p>
                        </button>
                      ))
                    : recipes.map((recipe) => (
                        <button
                          key={recipe.id}
                          onClick={() => handleSelectMeal({
                            name: recipe.name,
                            calories: recipe.calories,
                            isRestaurant: false,
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions
                          })}
                          className="text-left p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <h4 className="font-semibold">{recipe.name}</h4>
                          <p className="text-sm text-gray-600">
                            Calories: {recipe.calories}
                          </p>
                        </button>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 