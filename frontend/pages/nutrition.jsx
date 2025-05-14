import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
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
    <Layout>
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
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest text-white py-2 px-4 rounded hover:bg-forest/90 transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Food'}
              </button>
            </div>
          </form>
        </div>

        {/* Daily Entries */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold text-forest p-6 bg-gray-50">
            Today's Food Entries
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Protein
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carbs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sugars
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dailyEntries.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.food}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}g</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.calories}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.protein}g</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.carbs}g</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.fat}g</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.sugars}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
