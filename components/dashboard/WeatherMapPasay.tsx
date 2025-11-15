"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl, LayerGroup, GeoJSON, Marker, Tooltip, useMap } from "react-leaflet";
import * as L from "leaflet";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import { OpenWeatherMapLayer } from "./OpenWeatherMapLayer";
import type { AreaWeather } from "./lgu-weather-dashboard";

interface WeatherMapPasayProps {
  areas: AreaWeather[];
}

// Fit map to polygon bounds
function FitBounds({ geoData }: { geoData: FeatureCollection<Geometry, GeoJsonProperties> | null }) {
  const map = useMap();

  useEffect(() => {
    if (geoData) {
      const geo = new L.GeoJSON(geoData);
      map.fitBounds(geo.getBounds(), { padding: [20, 20] });
    }
  }, [geoData, map]);

  return null;
}

// Polygon style based on alert status
function getPolygonStyle(feature: Feature<Geometry, GeoJsonProperties>, areas: AreaWeather[]): L.PathOptions {
  const zoneName = feature.properties?.NAME_1 as string;
  const area = areas.find((a) => a.area === zoneName);
  let color = "green"; // safe by default

  if (area) {
    if (area.alert === "critical") color = "red";
    else if (area.alert === "warning") color = "yellow";
  }

  return {
    color,
    weight: 2,
    fillOpacity: 0.3,
  };
}

// Custom sensor icon
const sensorIcon = new L.Icon({
  iconUrl: "/icons/sensor.png", // replace with your icon path
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export function WeatherMapPasay({ areas }: WeatherMapPasayProps) {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

  // Fetch Pasay GeoJSON
  useEffect(() => {
    fetch("/PASAY.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection<Geometry, GeoJsonProperties>) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON", err));
  }, []);

  return (
    <MapContainer
      center={[14.5416, 120.9936]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "90vh", width: "100%" }}
    >
      {/* Base Map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Fit map to polygons */}
      {geoData && <FitBounds geoData={geoData} />}

      {/* Polygons */}
      {geoData && (
        <GeoJSON
          data={geoData}
          style={(feature) => getPolygonStyle(feature as Feature<Geometry, GeoJsonProperties>, areas)}
          onEachFeature={(feature, layer) => {
            if (layer instanceof L.Path) {
              layer.bindPopup(`<strong>${feature.properties?.NAME_1 || "Unknown"}</strong>`);
            }
          }}
        />
      )}

    {/* Markers for each area */}
    {areas.map((area) => (
      <Marker key={area.area} position={[area.lat, area.lon]} icon={sensorIcon}>
        <Tooltip direction="top" offset={[0, -15]} opacity={1} permanent={false}>
          <div className="p-2 rounded-lg shadow-lg w-48 bg-card border border-border text-xs text-foreground">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold">{area.area}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                area.alert === "critical"
                  ? "bg-red-500/30 text-red-300"
                  : area.alert === "warning"
                  ? "bg-yellow-500/30 text-yellow-300"
                  : "bg-green-500/30 text-green-300"
              }`}>
                {area.alert.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="opacity-70">Condition</p>
                <p className="font-semibold">{area.condition}</p>
              </div>
              <div>
                <p className="opacity-70">Temp</p>
                <p className="font-semibold">{area.temp}°C</p>
              </div>
              <div>
                <p className="opacity-70">Humidity</p>
                <p className="font-semibold">{area.humidity}%</p>
              </div>
              <div>
                <p className="opacity-70">Wind</p>
                <p className="font-semibold">{area.windSpeed} km/h</p>
              </div>
              <div className="col-span-2">
                <p className="opacity-70">Visibility</p>
                <p className="font-semibold">{area.visibility} km</p>
              </div>
            </div>
          </div>
        </Tooltip>
      </Marker>
    ))}


      {/* OpenWeatherMap Layers */}
      <LayersControl position="topright">
        {["wind_new", "clouds_new", "precipitation_new", "temp_new"].map((layer) => (
          <LayersControl.Overlay key={layer} name={layer}>
            <LayerGroup>
              <OpenWeatherMapLayer layer={layer as any} />
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
}
