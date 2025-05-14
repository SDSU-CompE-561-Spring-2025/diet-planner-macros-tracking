import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../src/services/api';

export default function MealPreferences() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    diningPreference: '', // 'home' or 'restaurant'
    dietaryRestrictions: [],
    cuisinePreferences: [],
    mealTypes: [],
    budget: '',
    cookingTime: '',
  });

  const [loading, setLoading] = useState(false);

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
    'None'
  ];

  const cuisineTypes = [
    'Italian',
    'Asian',
    'Mexican',
    'Mediterranean',
    'American',
    'Indian',
    'Middle Eastern'
  ];

  const mealTypeOptions = [
    'Quick & Easy',
    'Meal Prep Friendly',
    'Low Calorie',
    'High Protein',
    'Budget Friendly',
    'Family Style'
  ];

  const handleDietaryChange = (option) => {
    if (option === 'None') {
      setPreferences(prev => ({
        ...prev,
        dietaryRestrictions: ['None']
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.includes(option)
          ? prev.dietaryRestrictions.filter(item => item !== option && item !== 'None')
          : [...prev.dietaryRestrictions.filter(item => item !== 'None'), option]
      }));
    }
  };

  const handleMultiSelect = (field, option) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/api/preferences', preferences);
      router.push(preferences.diningPreference === 'home' ? '/meal-planner' : '/restaurants');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold text-forest mb-8 text-center">
            Personalize Your Meal Experience
          </h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div
              className="bg-mint h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-forest mb-6">
                How do you prefer to enjoy your meals?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className={`p-6 rounded-lg border-2 transition ${
                    preferences.diningPreference === 'home'
                      ? 'border-mint bg-mint/10'
                      : 'border-gray-200 hover:border-mint'
                  }`}
                  onClick={() => {
                    setPreferences(prev => ({ ...prev, diningPreference: 'home' }));
                    setStep(2);
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">Cooking at Home</h3>
                  <p className="text-gray-600">
                    Get personalized recipes and meal plans for home cooking
                  </p>
                </button>
                <button
                  className={`p-6 rounded-lg border-2 transition ${
                    preferences.diningPreference === 'restaurant'
                      ? 'border-mint bg-mint/10'
                      : 'border-gray-200 hover:border-mint'
                  }`}
                  onClick={() => {
                    setPreferences(prev => ({ ...prev, diningPreference: 'restaurant' }));
                    setStep(2);
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">Dining Out</h3>
                  <p className="text-gray-600">
                    Discover healthy restaurant options near you
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-forest mb-6">
                Do you have any dietary restrictions?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    className={`p-3 rounded-lg border-2 transition ${
                      preferences.dietaryRestrictions.includes(option)
                        ? 'border-mint bg-mint/10'
                        : 'border-gray-200 hover:border-mint'
                    }`}
                    onClick={() => handleDietaryChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-2 text-forest hover:text-forest/80"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-forest text-white rounded-lg hover:bg-forest/90"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-forest mb-6">
                What types of cuisine do you enjoy?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <button
                    key={cuisine}
                    className={`p-3 rounded-lg border-2 transition ${
                      preferences.cuisinePreferences.includes(cuisine)
                        ? 'border-mint bg-mint/10'
                        : 'border-gray-200 hover:border-mint'
                    }`}
                    onClick={() => handleMultiSelect('cuisinePreferences', cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-2 text-forest hover:text-forest/80"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-forest text-white rounded-lg hover:bg-forest/90"
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-forest mb-6">
                What are your meal preferences?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {mealTypeOptions.map((type) => (
                  <button
                    key={type}
                    className={`p-3 rounded-lg border-2 transition ${
                      preferences.mealTypes.includes(type)
                        ? 'border-mint bg-mint/10'
                        : 'border-gray-200 hover:border-mint'
                    }`}
                    onClick={() => handleMultiSelect('mealTypes', type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {preferences.diningPreference === 'home' && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    How much time do you have for cooking?
                  </h3>
                  <select
                    className="w-full p-3 border-2 rounded-lg"
                    value={preferences.cookingTime}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      cookingTime: e.target.value
                    }))}
                  >
                    <option value="">Select cooking time</option>
                    <option value="15">15 minutes or less</option>
                    <option value="30">30 minutes or less</option>
                    <option value="60">Up to 1 hour</option>
                    <option value="90">More than 1 hour</option>
                  </select>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  What's your budget per meal?
                </h3>
                <select
                  className="w-full p-3 border-2 rounded-lg"
                  value={preferences.budget}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    budget: e.target.value
                  }))}
                >
                  <option value="">Select budget range</option>
                  <option value="low">$5-10</option>
                  <option value="medium">$10-20</option>
                  <option value="high">$20+</option>
                </select>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="px-6 py-2 text-forest hover:text-forest/80"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  className={`px-8 py-3 bg-forest text-white rounded-lg transition
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-forest/90'}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Get Personalized Recommendations'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 