import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import api from '../src/services/api';

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    cuisine: '',
    price: '',
    rating: '',
    distance: '10',
    dietary: []
  });

  useEffect(() => {
    getUserLocation();
    fetchUserPreferences();
  }, []);

  useEffect(() => {
    if (location) {
      searchRestaurants();
    }
  }, [location, filters]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Failed to get your location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await api.get('/api/preferences');
      const prefs = response.data;
      if (prefs.dining_preference === 'restaurant') {
        setFilters(prev => ({
          ...prev,
          dietary: prefs.dietary_restrictions,
          cuisine: prefs.cuisine_preferences[0] || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const searchRestaurants = async () => {
    if (!location) return;

    setLoading(true);
    try {
      const response = await api.get('/api/restaurants/search', {
        params: {
          lat: location.lat,
          lng: location.lng,
          ...filters
        }
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDietaryToggle = (restriction) => {
    setFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(restriction)
        ? prev.dietary.filter(r => r !== restriction)
        : [...prev.dietary, restriction]
    }));
  };

  const cuisineTypes = [
    'Italian',
    'Asian',
    'Mexican',
    'Mediterranean',
    'American',
    'Indian',
    'Middle Eastern'
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free'
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-forest mb-8">Find Restaurants</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Type
              </label>
              <select
                value={filters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              >
                <option value="">All Cuisines</option>
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              >
                <option value="">Any Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distance (km)
              </label>
              <select
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
                className="w-full p-2 border rounded focus:ring-forest focus:border-forest"
              >
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="20">20 km</option>
                <option value="30">30 km</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleDietaryToggle(option)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.dietary.includes(option)
                      ? 'bg-forest text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Map */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="h-[400px]">
            {location && <Map location={location} restaurants={restaurants} />}
          </div>
        </div>

        {/* Restaurant List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading restaurants...</p>
            </div>
          ) : restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={restaurant.image_url || '/images/default-restaurant.jpg'}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-forest mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400 mr-1">★</div>
                    <span>{restaurant.rating}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">
                      {restaurant.price || 'N/A'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{restaurant.categories.join(', ')}</p>
                  <p className="text-gray-600 text-sm">
                    {restaurant.location.address1}, {restaurant.location.city}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest hover:text-forest/80"
                    >
                      View Details →
                    </a>
                    <span className="text-gray-600 text-sm">
                      {(restaurant.distance / 1000).toFixed(1)} km
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No restaurants found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
