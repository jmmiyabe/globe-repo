// src/components/EmergencyMap.tsx
'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import dynamic from 'next/dynamic';

const DynamicMapRouter = dynamic(() => import('./RoutingMapControls'), {
    ssr: false,
});

if (typeof window !== 'undefined' && L) {
  delete (L.Icon.Default.prototype as any)._getIconUrl; 
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
    iconUrl: 'leaflet/images/marker-icon.png',
    shadowUrl: 'leaflet/images/marker-shadow.png',
  });
}

export default function EmergencyMap() {
  const center: [number, number] = [14.5378, 121.0014]; 
  
  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl relative"> 
      
      {/* Permanent Crosshair UI Element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="w-5 h-5 relative flex items-center justify-center">
            <div className="absolute w-full h-0.5 bg-red-500" style={{boxShadow: '0 0 0 1px rgba(255, 0, 0, 0.2)'}}></div>
            <div className="absolute h-full w-0.5 bg-red-500" style={{boxShadow: '0 0 0 1px rgba(255, 0, 0, 0.2)'}}></div>
        </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full z-0" 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
        
        <DynamicMapRouter />
        
      </MapContainer>
    </div>
  );
}