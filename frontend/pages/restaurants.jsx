import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../src/services/api";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(5); // in kilometers

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchNearbyRestaurants(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError("Please enable location services to find nearby restaurants.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const fetchNearbyRestaurants = async (lat, lng) => {
    try {
      const response = await api.get(`/api/restaurants/nearby`, {
        params: {
          lat,
          lng,
          radius: searchRadius
        }
      });
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch nearby restaurants. Please try again later.");
      setLoading(false);
    }
  };

  const handleRadiusChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setSearchRadius(newRadius);
    if (location) {
      fetchNearbyRestaurants(location.lat, location.lng);
    }
  };

  return (
    <div className="min-h-screen bg-ivory p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-forest mb-8">Nearby Restaurants</h1>
        
        {/* Search radius control */}
        <div className="mb-6">
          <label className="block text-forest font-semibold mb-2">Search Radius (km)</label>
          <select
            value={searchRadius}
            onChange={handleRadiusChange}
            className="w-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
          >
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
          </div>
        )}

        {/* Restaurant list */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-300px)]">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-forest mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">{restaurant.address}</p>
                
                {/* Nutrition score indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Nutrition Score</span>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium
                      ${restaurant.nutritionScore >= 8 ? 'bg-green-500' :
                        restaurant.nutritionScore >= 6 ? 'bg-yellow-500' :
                        'bg-red-500'}`}
                    >
                      {restaurant.nutritionScore}/10
                    </span>
                  </div>
                </div>

                {/* Nutrition details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Calories</span>
                    <span className="font-medium">{restaurant.averageCalories} kcal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Healthy Options</span>
                    <span className="font-medium">{restaurant.healthyOptionsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium">{restaurant.distance.toFixed(1)} km</span>
                  </div>
                </div>

                <button
                  onClick={() => window.open(restaurant.menuUrl, '_blank')}
                  className="mt-4 w-full bg-forest text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors"
                >
                  View Menu
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
