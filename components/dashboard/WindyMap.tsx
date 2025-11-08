"use client"

import React, { useEffect, useRef } from "react"

// --- Global Type Declaration for Windy ---
declare global {
  interface Window {
    windyInit: (
      options: Record<string, any>,
      callback: (windyAPI: { map: L.Map }) => void
    ) => void
    L: any // Global Leaflet object
  }
}

// --- Interfaces (Copy/Paste these from your project) ---
export interface AreaWeather {
  area: string
  condition: string
  temp: number
  humidity: number
  windSpeed: number
  visibility: number
  alert: "critical" | "warning" | "safe"
  lat: number
  lon: number
}

interface WindyMapProps {
  apiKey: string
  lat: number
  lon: number
  zoom: number
  height?: string
  areas: AreaWeather[]
}

export function WindyMap({ apiKey, lat, lon, zoom, height = "500px", areas }: WindyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  // Reference to hold the actual Leaflet map instance for official cleanup
  const mapInstanceRef = useRef<L.Map | null>(null) 

  useEffect(() => {
    // Check if the container exists and the windyInit function is available
    if (mapRef.current && window.windyInit) {
      
      const options = {
        key: apiKey,
        lat: lat,
        lon: lon,
        zoom: zoom,
        overlay: "wind",
        container: "windy-map-container", 
      }

      window.windyInit(options, (windyAPI) => {
        const { map } = windyAPI
        
        // 1. Store the map instance for cleanup
        mapInstanceRef.current = map; 

        if (window.L) {
          areas.forEach((area) => {
            // ... (Marker/Icon creation logic remains the same)
            let iconColor = area.alert === "critical" ? "red" : area.alert === "warning" ? "orange" : "green"
            let iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${iconColor}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`

            const customIcon = window.L.divIcon({
              html: iconHtml,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              className: `weather-marker ${area.alert}-marker`,
            })

            const popupContent = `...` // Popup content HTML

            window.L.marker([area.lat, area.lon], { icon: customIcon })
              .addTo(map)
              .bindPopup(popupContent)
          })
        }
      })
    }

    // 🛑 THE FINAL CRUCIAL CLEANUP 🛑
    return () => {
        // 1. Officially destroy the Leaflet map instance
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove(); // Removes the map from the DOM and cleans up listeners
            mapInstanceRef.current = null;
        }

        // 2. Clear the container's HTML content
        const container = document.getElementById('windy-map-container');
        if (container) {
            container.innerHTML = "";
        }
        
        // 3. Hard delete the global Leaflet object to force full reset
        if (typeof window.L !== "undefined") {
            // @ts-ignore
            delete window.L;
        }
    }
  }, [apiKey, lat, lon, zoom, areas])

  return (
    <div
      ref={mapRef}
      id="windy-map-container" 
      style={{ height, width: "100%", borderRadius: "0.5rem" }}
      className="bg-gray-200 dark:bg-gray-800"
    />
  )
}