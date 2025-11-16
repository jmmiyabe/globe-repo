// file: SimpleMap.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMapEvents,
  Polyline 
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 1. Data received from the Maps API calls
const NEAREST_FACILITY = {
  name: "Saint Famille Multi Specialty Clinic & Lying-in",
  distance: "1 km",
  duration: "2 min",
  coords: [14.5145441, 121.0524886] as L.LatLngTuple, 
};

// 2. Custom Icons for map elements
const dummyIcon = L.divIcon({ className: '', html: '', iconSize: [0, 0], iconAnchor: [0, 0] });

const facilityIcon = L.divIcon({
    className: 'emergency-facility-marker',
    html: '<div style="background-color: blue; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white;"></div>',
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5]
});

// 3. Component to handle map clicks
function MapClickHandler({ setConfirmOpen }: { setConfirmOpen: (open: boolean) => void }) {
  useMapEvents({
    click: () => setConfirmOpen(true),
  });
  return null;
}

// 🗺️ Main Map Component
export default function SimpleMap() {
  const mapRef = useRef<L.Map | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPos, setSelectedPos] = useState<L.LatLng | null>(null);
  
  const [facilityPos, setFacilityPos] = useState<L.LatLngTuple | null>(null);
  const [emergencyRoute, setEmergencyRoute] = useState<{name: string, distance: string, duration: string} | null>(null);

  // ✅ Declare polylinePath as L.LatLngExpression[] from the start
  const [polylinePath, setPolylinePath] = useState<L.LatLngExpression[]>([]);

  // Fix map size after mount
  useEffect(() => {
    const timer = setTimeout(() => mapRef.current?.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, []);

  // Confirm location: place marker at center, set facility marker, and draw route
  const confirmLocation = () => {
    if (!mapRef.current) return;

    const centerLatLng = mapRef.current.getCenter();

    // 1. Set markers and state
    setSelectedPos(centerLatLng);
    setConfirmOpen(false);
    setFacilityPos(NEAREST_FACILITY.coords);
    setEmergencyRoute({
      name: NEAREST_FACILITY.name,
      distance: NEAREST_FACILITY.distance,
      duration: NEAREST_FACILITY.duration,
    });
    
    // 2. Calculate the path
    const startCoord: L.LatLngExpression = [centerLatLng.lat, centerLatLng.lng];
    setPolylinePath([startCoord, NEAREST_FACILITY.coords]);
  };

  return (
    <div className="relative w-full" style={{ height: "400px" }}>
      {/* MAP */}
      <MapContainer
        center={[14.5378, 121.0014]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef as React.MutableRefObject<L.Map>} 
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler setConfirmOpen={setConfirmOpen} />

        {/* 🆕 Route Line (Straight line approximation) */}
        {polylinePath.length === 2 && (
            <Polyline 
                positions={polylinePath} // ✅ No casting needed
                color="red" 
                weight={5} 
                opacity={0.7} 
                dashArray="10, 10" 
            />
        )}

        {/* Marker component used only to display the Popup at the selected position */}
        {selectedPos && (
          <Marker position={selectedPos} icon={dummyIcon}>
            <Popup>
              Selected Location: {selectedPos.lat.toFixed(4)}, {selectedPos.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}

        {/* Marker for the destination facility */}
        {facilityPos && (
            <Marker position={facilityPos} icon={facilityIcon}>
                <Popup>{NEAREST_FACILITY.name}</Popup>
            </Marker>
        )}
      </MapContainer>

      {/* CROSSHAIR & VISUAL PIN */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[9999]">
        <div className="relative" style={{ width: '40px', height: '40px' }}>
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-red-600" style={{ transform: 'translateX(-50%)' }} />
          <div className="absolute left-0 top-1/2 h-[2px] w-full bg-red-600" style={{ transform: 'translateY(-50%)' }} />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-600 rounded-full border border-white" style={{ transform: 'translate(-50%, -50%)' }} />
          
          {selectedPos && (
             <div className="absolute w-7 h-7" style={{ 
                top: '50%', 
                left: '50%',
                transform: 'translate(-50%, -100%)' 
             }}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="red" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                >
                    <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z"></path>
                    <circle cx="12" cy="11" r="2"></circle>
                </svg>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION POPUP */}
      {confirmOpen && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 z-[99999]">
          <p className="text-black font-medium mb-3">Pick location?</p>
          <div className="flex gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={confirmLocation}
            >
              Yes
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              onClick={() => setConfirmOpen(false)}
            >
              Reselect
            </button>
          </div>
        </div>
      )}

      {/* Emergency Route Details Display */}
      {emergencyRoute && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 z-[99999] text-center border-l-4 border-red-600">
            <p className="text-black font-medium mb-2">🚨 Emergency Route Approximation 🚨</p>
            <p className="text-sm text-gray-600">
                Route to: **{emergencyRoute.name}**
            </p>
            <p className="text-sm text-gray-600">
                **Driving Distance:** {emergencyRoute.distance} | **Time:** {emergencyRoute.duration}
            </p>
            <p className="mt-2 text-xs text-red-500">
                *The line on the map is a straight-line approximation. Use a dedicated navigation app for the actual driving route.*
            </p>
        </div>
      )}
    </div>
  );
}
