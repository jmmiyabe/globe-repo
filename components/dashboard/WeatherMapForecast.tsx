"use client"

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

interface Area {
  area: string
  lat: number
  lon: number
  temp: number
  humidity: number
  windSpeed: number
  visibility: number
  alert: "critical" | "warning" | "safe"
}

interface WeatherMapProps {
  areas: Area[]
}

export default function WeatherMap({ areas }: WeatherMapProps) {
  // Center map on Pasay
  const center: [number, number] = [14.5416, 120.9936]

  // Custom icons based on alert level
  const getIcon = (alert: Area["alert"]) => {
    const color = alert === "critical" ? "red" : alert === "warning" ? "orange" : "green"
    return new L.DivIcon({
      html: `<div style="
        background:${color}; 
        width:16px; 
        height:16px; 
        border-radius:50%; 
        border:2px solid white;
      "></div>`,
      className: "",
      iconSize: [16, 16],
    })
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%", borderRadius: "0.5rem" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      {areas.map((area) => (
        <Marker
          key={area.area}
          position={[area.lat, area.lon]}
          icon={getIcon(area.alert)}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
            <div style={{ minWidth: "120px" }}>
              <strong>{area.area}</strong>
              <div>Temp: {area.temp}°C</div>
              <div>Humidity: {area.humidity}%</div>
              <div>Wind: {area.windSpeed} km/h</div>
              <div>Visibility: {area.visibility} km</div>
              <div style={{ color: area.alert === "critical" ? "red" : area.alert === "warning" ? "orange" : "green" }}>
                Alert: {area.alert.toUpperCase()}
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
