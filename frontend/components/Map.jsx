import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

export default function Map({ location, restaurants }) {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* User location marker */}
      <Marker position={[location.lat, location.lng]}>
        <Popup>Your location</Popup>
      </Marker>

      {/* Restaurant markers */}
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.coordinates.latitude, restaurant.coordinates.longitude]}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{restaurant.name}</h3>
              <p className="text-sm">{restaurant.location.address1}</p>
              <p className="text-sm">Rating: {restaurant.rating} ★</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 