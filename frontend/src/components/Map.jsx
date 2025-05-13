import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet and the map component only on the client side
const Map = dynamic(() => import('react-leaflet'), { ssr: false });

const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Create a ref to store the map instance

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet'); // Import Leaflet only on the client side

      // Initialize the map if not already initialized
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13); // Example map initialization
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current); // Add tile layer to map instance
      }
    }
  }, []);

  return (
    <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
  );
};

export default LeafletMap;
