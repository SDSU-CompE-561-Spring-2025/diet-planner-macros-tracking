import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../src/services/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
    <div className="flex flex-col items-center min-h-screen bg-ivory px-4 py-10 text-forest">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Nearby Restaurants</h1>

      <div className="w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
          aria-label="Location input"
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={fetchRestaurants}
            className="w-full bg-forest text-white font-semibold py-3 rounded hover:bg-green-700 transition"
            aria-label="Search restaurants"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="w-full bg-gray-500 text-white font-semibold py-3 rounded hover:bg-gray-600 transition"
            aria-label="Clear search"
          >
            Clear
          </button>
        </div>

        {loading && <p className="text-blue-500 mb-4">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Leaflet map container */}
        {restaurants.length > 0 && (
          <MapContainer
            center={[restaurants[0].location.latitude, restaurants[0].location.longitude]}
            zoom={13}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={[
                  restaurant.location.latitude,
                  restaurant.location.longitude,
                ]}
                icon={new L.Icon({
                  iconUrl: require("leaflet/dist/images/marker-icon.png"),
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <strong>{restaurant.name}</strong>
                  <p>{restaurant.location.address1}</p>
                  {restaurant.rating && <p>Rating: {restaurant.rating} / 5</p>}
                  {restaurant.phone && <p>Phone: {restaurant.phone}</p>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <ul className="mt-6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
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
