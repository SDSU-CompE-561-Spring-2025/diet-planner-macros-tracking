import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

export default function Map({ restaurants, location }) {
  // Handle home page case
  if (location) {
    return (
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <strong>Your Location</strong>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }

  // Handle restaurants page case
  if (!restaurants || restaurants.length === 0) return null;

  return (
    <MapContainer
      center={[
        restaurants[0].location.latitude,
        restaurants[0].location.longitude,
      ]}
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
  );
}
