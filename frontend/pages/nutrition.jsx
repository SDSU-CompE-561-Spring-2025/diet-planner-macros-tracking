import { useState, useEffect } from 'react';
import api from '../src/services/api';

export default function Nutrition() {
  const [nutritionData, setNutritionData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugars: 0
  });

  const [foodEntry, setFoodEntry] = useState({
    food: '',
    quantity: '',
    calories: '',
    protein: '',
    fat: '',
    sugars: '',
    carbs: ''
  });

  const [dailyEntries, setDailyEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDailyNutrition();
  }, []);

  const fetchDailyNutrition = async () => {
    try {
      const response = await api.get('/api/nutrition/daily');
      setDailyEntries(response.data.entries);
      setNutritionData(response.data.totals);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      setError('Failed to load nutrition data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/nutrition', foodEntry);
      await fetchDailyNutrition();
      setFoodEntry({
        food: '',
        quantity: '',
        calories: '',
        protein: '',
        fat: '',
        sugars: '',
        carbs: ''
      });
    } catch (error) {
      console.error('Error adding food entry:', error);
      setError('Failed to add food entry');
    } finally {
      setLoading(false);
    }
  };

  const MacroCard = ({ title, value, color, unit = 'g' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
        <span className="text-sm ml-1">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-forest mb-8">Nutrition Tracking</h1>

      {/* Macro Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <MacroCard
          title="Calories"
          value={nutritionData.calories}
          color="text-orange-500"
          unit="kcal"
        />
        <MacroCard
          title="Protein"
          value={nutritionData.protein}
          color="text-blue-500"
        />
        <MacroCard
          title="Carbs"
          value={nutritionData.carbs}
          color="text-green-500"
        />
        <MacroCard
          title="Fat"
          value={nutritionData.fat}
          color="text-yellow-500"
        />
        <MacroCard
          title="Sugars"
          value={nutritionData.sugars}
          color="text-pink-500"
        />
      </div>

      {/* Add Food Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-forest mb-4">Add Food Entry</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              name="food"
              value={foodEntry.food}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (g)
            </label>
            <input
              type="number"
              name="quantity"
              value={foodEntry.quantity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              value={foodEntry.calories}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              name="protein"
              value={foodEntry.protein}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              name="carbs"
              value={foodEntry.carbs}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fat (g)
            </label>
            <input
              type="number"
              name="fat"
              value={foodEntry.fat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sugars (g)
            </label>
            <input
              type="number"
              name="sugars"
              value={foodEntry.sugars}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              required
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="bg-forest text-white px-6 py-2 rounded-lg hover:bg-forest/90 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Food Entry'}
            </button>
          </div>
        </form>
      </div>

      {/* Daily Entries */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-forest mb-4">Today's Food Entries</h2>
        {dailyEntries.length > 0 ? (
          <div className="space-y-4">
            {dailyEntries.map((entry, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.food}</h3>
                    <p className="text-gray-600">
                      Quantity: {entry.quantity}g | Calories: {entry.calories}kcal
                    </p>
                    <p className="text-sm text-gray-500">
                      Protein: {entry.protein}g | Carbs: {entry.carbs}g | Fat: {entry.fat}g | Sugars: {entry.sugars}g
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No food entries for today</p>
        )}
      </div>
    </div>
  );
}
