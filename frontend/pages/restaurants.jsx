import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../src/services/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Leaflet for marker icon management

export default function Restaurants() {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(
        `/restaurants/nearby?location=${location}`
      );
      setRestaurants(response.data.restaurants);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch restaurants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setLocation("");
    setRestaurants([]);
    setError("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Restaurants</h1>
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
        aria-label="Location input"
      />
      <div className="flex space-x-2">
        <button
          onClick={fetchRestaurants}
          className="bg-blue-500 text-white p-2 rounded w-full"
          aria-label="Search restaurants"
        >
          Search
        </button>
        <button
          onClick={clearSearch}
          className="bg-gray-500 text-white p-2 rounded w-full"
          aria-label="Clear search"
        >
          Clear
        </button>
      </div>
      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <ul className="mt-4">
        {restaurants.length > 0
          ? restaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-1">{restaurant.name}</h2>
                <p>{restaurant.location.address1}</p>
                {restaurant.rating && <p>Rating: {restaurant.rating} / 5</p>}
                {restaurant.phone && <p>Phone: {restaurant.phone}</p>}
              </li>
            ))
          ) : (
            !loading && <p className="text-gray-500">No restaurants found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
