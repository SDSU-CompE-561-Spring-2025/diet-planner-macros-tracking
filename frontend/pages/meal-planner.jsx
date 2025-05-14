import { useState, useEffect } from "react";
import Layout from '../components/Layout';
import api from "../src/services/api";
import Link from 'next/link';

export default function MealPlanner() {
  const [mealPlan, setMealPlan] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
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
  const [preferences, setPreferences] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchUserPreferences();
    fetchMealPlan();
  }, [selectedDate]);

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
            const response = await api.get("/restaurants/nearby", {
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
      const response = await api.get("/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await api.get('/preferences');
      setPreferences(response.data);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const fetchMealPlan = async () => {
    setLoading(true);
    try {
      const response = await api.get('/meal-plans', {
        params: {
          date: selectedDate.toISOString().split('T')[0]
        }
      });
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setError('Failed to load meal plan');
    } finally {
      setLoading(false);
    }
  };

  const generateMealPlan = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/meal-plans/generate', {
        date: selectedDate.toISOString().split('T')[0]
      });
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  const addToShoppingList = async (ingredients) => {
    try {
      await api.post('/shopping-list', { items: ingredients });
      // Show success message
    } catch (error) {
      console.error('Error adding to shopping list:', error);
    }
  };

  const handleAddMeal = (mealType) => {
    setSelectedMealType(mealType);
    setShowMealSelector(true);
  };

  const handleSelectMeal = (meal) => {
    setMealPlan(prev => ({
      ...prev,
      [selectedMealType]: [...prev[selectedMealType], meal]
    }));
    setShowMealSelector(false);
  };

  const handleRemoveMeal = (mealType, index) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter((_, i) => i !== index)
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
            onClick={() => onRemove(meal)}
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

  const MealSection = ({ title, meals }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-forest mb-4">{title}</h2>
      {meals.length > 0 ? (
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                  <p className="text-gray-600 mb-2">
                    Calories: {meal.calories} | Protein: {meal.protein}g | 
                    Carbs: {meal.carbs}g | Fat: {meal.fat}g
                  </p>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-forest hover:text-forest/80">
                      View Ingredients
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(meal.ingredients).map(([ingredient, amount], i) => (
                        <li key={i}>{amount}g {ingredient}</li>
                      ))}
                    </ul>
                  </details>
                </div>
                <button
                  onClick={() => addToShoppingList(meal.ingredients)}
                  className="text-forest hover:text-forest/80"
                >
                  🛒 Add to List
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No meals planned</p>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-forest">Meal Planner</h1>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border rounded p-2"
            />
            <button
              onClick={generateMealPlan}
              disabled={loading}
              className="bg-forest text-white px-6 py-2 rounded-lg hover:bg-forest/90 transition disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </div>

        {!preferences && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please set your meal preferences first to get personalized recommendations.{' '}
                  <Link href="/meal-preferences" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                    Set Preferences
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <MealSection title="Breakfast" meals={mealPlan.breakfast} />
          <MealSection title="Lunch" meals={mealPlan.lunch} />
          <MealSection title="Dinner" meals={mealPlan.dinner} />
          <MealSection title="Snacks" meals={mealPlan.snacks} />
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/shopping-list"
            className="text-forest hover:text-forest/80 flex items-center"
          >
            <span>View Shopping List</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Layout>
  );
} 