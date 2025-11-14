"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L, { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
// 🛑 Removed 'GeoJsonProperties' import
import { Feature, Geometry } from "geojson";

// ---------------- TYPES ----------------
export interface AreaWeather {
  area: string;
  lat: number;
  lon: number;
  condition: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  alert: "critical" | "warning" | "safe";
}

// ✅ FIX: Use a generic Record<string, any> for GeoJSON properties
interface BrgyProperties extends Record<string, any> { 
  brgy_name: string; 
  weather?: AreaWeather | null;
}

interface WeatherMapPasayProps {
  areas: AreaWeather[];
}

// ---------------- ICON (No change) ----------------
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

// ---------------- AUTO-FIT MAP (No change) ----------------
function MapBoundsController({ geojson }: { geojson: Feature<Geometry, BrgyProperties>[] }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    const layer = L.geoJSON(geojson as any); 
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, geojson]);
  return null;
}

// ---------------- COMPONENT ----------------
export default function WeatherMapPasay({ areas }: WeatherMapPasayProps) {
  const [geojson, setGeojson] = useState<Feature<Geometry, BrgyProperties>[] | null>(null);

  // Fetch Pasay GeoJSON & merge weather 
  useEffect(() => {
    async function fetchGeoJSON() {
      try {
        const res = await fetch("/Pasay.geojson"); 
        if (!res.ok) throw new Error("Failed to fetch GeoJSON");
        const data = await res.json();

        const features: Feature<Geometry, BrgyProperties>[] = data.features.map((feature: any) => {
          const brgyName = feature.properties.brgy_name; 
          const weather = areas.find((a) => a.area === brgyName) || null;
          return {
            ...feature,
            properties: {
              ...feature.properties,
              weather,
            },
          } as Feature<Geometry, BrgyProperties>;
        });

        setGeojson(features);
      } catch (err) {
        console.error("Failed to load Pasay polygons", err);
      }
    }
    
    if (!geojson) {
        fetchGeoJSON();
    } else {
        const updatedFeatures: Feature<Geometry, BrgyProperties>[] = geojson.map((feature) => {
            const brgyName = feature.properties.brgy_name;
            const weather = areas.find((a) => a.area === brgyName) || null;
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    weather,
                },
            };
        });
        setGeojson(updatedFeatures);
    }

  }, [areas, geojson]); // Added geojson to dependency array for clarity/correctness

  // ✅ FIX: The function signature is correctly defined to return Leaflet's PathOptions.
  // We use the generic Feature type for the argument, which is safer.
  const getPolygonStyle = (feature: Feature<Geometry, BrgyProperties>): PathOptions => {
    const props = feature.properties as BrgyProperties;
    const alert = props.weather?.alert ?? "safe";
    
    const colors: Record<string, { stroke: string; fill: string }> = {
      critical: { stroke: "#ff0000", fill: "#ff000050" },
      warning: { stroke: "#ffff00", fill: "#ffff0050" },
      safe: { stroke: "#0088ff", fill: "#0088ff33" },
    };
    
    return {
      color: colors[alert].stroke,
      weight: 1,
      fillColor: colors[alert].fill,
      fillOpacity: 0.4,
    };
  };

  return (
    <div style={{ height: "400px", width: "100%" }}> 
      <MapContainer
        center={[14.552, 120.998]}
        zoom={13}
        style={{ width: "100%", height: "100%" }} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {geojson && <MapBoundsController geojson={geojson} />}

        {geojson && (
          <GeoJSON
            data={geojson as any} 
            style={getPolygonStyle as any} // Keep the 'as any' for maximum compatibility with react-leaflet
            onEachFeature={(feature, layer) => {
              const brgyName = (feature.properties as BrgyProperties).brgy_name; 
              const weather = (feature.properties as BrgyProperties).weather;

              const condition = weather?.condition ?? "No Data";
              const alert = weather?.alert ?? "No Data";
              layer.bindPopup(
                `<strong>${brgyName}</strong><br/>Condition: ${condition}<br/>Alert: ${alert}`
              );
            }}
          />
        )}

        {areas.map((area) => (
          <Marker key={area.area} position={[area.lat, area.lon]}>
            <Popup>
              <strong>{area.area}</strong>
              <br />
              Condition: {area.condition}
              <br />
              Temp: {area.temp}°C
              <br />
              Humidity: {area.humidity}%
              <br />
              Wind: {area.windSpeed} km/h
              <br />
              Visibility: {area.visibility} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}