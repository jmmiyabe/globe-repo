'use client'; 

import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L, { LatLng, Control } from 'leaflet'; 
import { useState, useEffect, useCallback } from 'react';
import 'leaflet-routing-machine';

const mockEmergencyCenter: LatLng = L.latLng(14.540, 121.010); 

// --- 1. ROUTING LOGIC COMPONENT ---

interface RoutingControlProps {
  startPoint: LatLng;
  endPoint: LatLng;
  setRouteInstructions: (instructions: string | null) => void;
  onRouteCalculated: () => void; 
}

const RoutingControl = ({ startPoint, endPoint, setRouteInstructions, onRouteCalculated }: RoutingControlProps) => {
  const map = useMap();

  useEffect(() => {
    if (typeof L.Routing === 'undefined' || typeof L.Routing.control === 'undefined') return;

    map.eachLayer((layer: any) => {
        if (layer instanceof L.Control && layer.options && (layer.options as any).router) {
            map.removeControl(layer); 
        }
    });
    
    const currentRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint.lat, startPoint.lng),
        L.latLng(endPoint.lat, endPoint.lng)
      ],
      routeWhileDragging: false,
      show: false, 
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: {
        styles: [{ color: '#EF4444', weight: 6, opacity: 0.7 }]
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1' 
      }),
      createMarker: (i: number, waypoint: any) => {
        if (i === 0) {
          return L.marker(waypoint.latLng, {
            icon: L.divIcon({
              html: `<div style="background-color: #3B82F6; color: white; border-radius: 50%; padding: 5px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">S</div>`,
              className: ''
            })
          });
        }
        return false;
      }
    } as any).addTo(map);
    
    currentRoutingControl.on('routesfound', (e: any) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      const totalDistanceKm = (summary.totalDistance / 1000).toFixed(1);
      const totalTimeMinutes = Math.round(summary.totalTime / 60);
      setRouteInstructions(`ROUTE FOUND: ${totalDistanceKm} km, ${totalTimeMinutes} mins (via road).`);
      const bounds = L.latLngBounds(routes[0].coordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      onRouteCalculated();
    });

    currentRoutingControl.on('routingerror', (e: any) => {
        setRouteInstructions(`ERROR: Could not find route. ${e.error.message}`);
        onRouteCalculated();
    });

    return () => {
    try {
        if (currentRoutingControl) {
        const plan = (currentRoutingControl as any)._plan;
        if (plan && typeof plan.abort === 'function') {
            plan.abort();
        }
        
        if (typeof (currentRoutingControl as any)._routeDone === 'function') {
            (currentRoutingControl as any)._routeDone();
        }
        
        map.removeControl(currentRoutingControl);
        }
    } catch (err) {
        console.warn("Routing cleanup failed:", err);
    }
    };
  }, [map, startPoint, endPoint, setRouteInstructions, onRouteCalculated]);

  return null;
};

// --- 2. MAIN MAP INTERACTION COMPONENT (EXPORT) ---

export default function MapClickRouter() {
  const map = useMap();
  const [selectedPoint, setSelectedPoint] = useState<LatLng | null>(null);
  const [crosshairPoint, setCrosshairPoint] = useState<LatLng>(map.getCenter());
  const [routeInstructions, setRouteInstructions] = useState<string | null>(null);
  const [isRouteActive, setIsRouteActive] = useState(false);

  useMapEvents({
    move: () => setCrosshairPoint(map.getCenter()),
    click: () => {
      if (isRouteActive) return;
      if (!selectedPoint) setSelectedPoint(map.getCenter());
    },
  });

  const handleRouteCalculated = useCallback(() => setIsRouteActive(true), []);

  const handleSetRoute = () => {
    if (selectedPoint) setRouteInstructions(`Calculating road route...`);
  };

  const handleCancelSelection = () => {
    setSelectedPoint(null);
    setRouteInstructions(null);
    setIsRouteActive(false);
  };

  const handlePickNewLocation = () => {
    setSelectedPoint(null);
    setRouteInstructions(null);
    setIsRouteActive(false);
    map.flyTo(crosshairPoint, map.getZoom());
  };

  return (
    <>
      {selectedPoint && routeInstructions && (
        <RoutingControl 
          startPoint={selectedPoint} 
          endPoint={mockEmergencyCenter} 
          setRouteInstructions={setRouteInstructions} 
          onRouteCalculated={handleRouteCalculated}
        />
      )}
      
      {/* NEW: Absolutely positioned control for resetting the route */}
      {isRouteActive && (
          <div className="leaflet-bottom leaflet-right z-10 p-2">
            <button 
                className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-xl transition duration-200"
                onClick={handlePickNewLocation}
            >
                Pick a New Location
            </button>
          </div>
      )}

      <Marker 
        position={mockEmergencyCenter}
        icon={new L.DivIcon({ 
          html: `<div style="background-color: #EF4444; color: white; border-radius: 50%; padding: 5px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">E</div>`,
          className: '' 
        })}
      >
        <Popup>
          <div className="p-1">
            <p className="font-bold text-red-600 mb-1">NEAREST EMERGENCY CENTER</p>
            {routeInstructions && <p className="text-sm mt-1">{routeInstructions}</p>}
          </div>
        </Popup>
      </Marker>

      {selectedPoint && !isRouteActive && (
        <Popup 
          position={selectedPoint} 
          closeButton={false}
          autoPan={false} 
        >
          <div className="text-center p-2 rounded-lg shadow-md bg-white">
            <p className="font-bold text-slate-800 mb-2">Use crosshair location as start?</p>
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full mr-2 transition duration-200"
              onClick={handleSetRoute}
            >
              Set Route
            </button>
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-slate-800 text-sm font-semibold px-3 py-1 rounded-full transition duration-200"
              onClick={handleCancelSelection}
            >
              Cancel
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}