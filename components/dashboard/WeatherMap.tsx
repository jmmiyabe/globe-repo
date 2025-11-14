"use client";

import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
  coordinates?: number[][][]; // polygon coordinates from GeoJSON
}

interface WeatherMapPasayProps {
  areas: AreaWeather[];
}

export default function WeatherMapPasay({ areas }: WeatherMapPasayProps) {
  return (
    <MapContainer
      center={[14.5333, 121.0]} // center of Pasay
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {areas.map((b) => (
        <div key={b.area}>
          {/* Polygon */}
          {b.coordinates &&
            b.coordinates.map((ring, i) => (
              <Polygon
                key={i}
                positions={ring.map(([lon, lat]) => [lat, lon])}
                pathOptions={{
                  color:
                    b.alert === "critical"
                      ? "red"
                      : b.alert === "warning"
                      ? "orange"
                      : "green",
                  weight: 2,
                  fillOpacity: 0.2,
                }}
              />
            ))}

          {/* Marker */}
          <Marker position={[b.lat, b.lon]}>
            <Popup>
              <strong>{b.area}</strong>
              <br />
              Condition: {b.condition}
              <br />
              Temp: {b.temp}°C
              <br />
              Humidity: {b.humidity}%
              <br />
              Wind: {b.windSpeed} km/h
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
}
