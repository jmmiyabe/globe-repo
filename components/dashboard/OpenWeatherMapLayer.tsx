"use client";

import { TileLayer } from "react-leaflet";

interface OpenWeatherMapLayerProps {
  layer: "wind_new" | "clouds_new" | "precipitation_new" | "temp_new";
  opacity?: number;
}

export function OpenWeatherMapLayer({ layer, opacity = 0.6 }: OpenWeatherMapLayerProps) {
  const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY;

  return (
    <TileLayer
      url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`}
      attribution='&copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
      opacity={opacity}
    />
  );
}
