"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Building {
  id: number;
  name: string;
  type: string;
  status: "safe" | "warning" | "critical";
  lat: number;
  lng: number;
  lastInspection: string;
  warningRadius: number;
  structuralScore: number;
  issues: string[];
}

interface StructuralMonitoringMapProps {
  buildings: Building[];
  onBuildingSelect: (building: Building) => void;
}

export default function StructuralMonitoringMap({
  buildings,
  onBuildingSelect,
}: StructuralMonitoringMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const circlesRef = useRef<L.Circle[]>([]);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map centered on Pasay City
      mapRef.current = L.map("structural-map").setView([14.5378, 121.0014], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Load and add Pasay GeoJSON boundary
      fetch("/PASAY.geojson")
        .then((response) => response.json())
        .then((data) => {
          if (mapRef.current && !geoJsonLayerRef.current) {
            geoJsonLayerRef.current = L.geoJSON(data, {
              style: {
                color: "#3b82f6",
                weight: 2,
                fillColor: "#3b82f6",
                fillOpacity: 0.1,
              },
            }).addTo(mapRef.current);

            // Fit map to GeoJSON bounds
            if (geoJsonLayerRef.current) {
              mapRef.current.fitBounds(geoJsonLayerRef.current.getBounds());
            }
          }
        })
        .catch((error) => console.error("Error loading GeoJSON:", error));
    }

    // Clear existing markers and circles
    markersRef.current.forEach((marker) => marker.remove());
    circlesRef.current.forEach((circle) => circle.remove());
    markersRef.current = [];
    circlesRef.current = [];

    // Add markers for each building
    buildings.forEach((building) => {
      const map = mapRef.current;
      if (!map) return;

      // Determine marker color based on status
      const markerColor =
        building.status === "safe"
          ? "#22c55e"
          : building.status === "warning"
          ? "#eab308"
          : "#ef4444";

      // Create custom icon
      const customIcon = L.divIcon({
        className: "custom-building-marker",
        html: `
          <div style="
            background-color: ${markerColor};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 14px;
          ">
            ${building.id}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Create marker
      const marker = L.marker([building.lat, building.lng], {
        icon: customIcon,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${
            building.name
          }</h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${
            building.type
          }</p>
          <p style="font-size: 12px; margin-bottom: 4px;">
            <strong>Status:</strong> 
            <span style="color: ${markerColor}; font-weight: bold;">${building.status.toUpperCase()}</span>
          </p>
          <p style="font-size: 12px; margin-bottom: 4px;">
            <strong>Score:</strong> ${building.structuralScore}/100
          </p>
          <p style="font-size: 12px;">
            <strong>Last Check:</strong> ${building.lastInspection}
          </p>
          ${
            building.warningRadius > 0
              ? `<p style="font-size: 12px; color: #eab308; margin-top: 8px;">
                ⚠️ ${building.warningRadius}m warning radius
              </p>`
              : ""
          }
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click event
      marker.on("click", () => {
        onBuildingSelect(building);
      });

      markersRef.current.push(marker);

      // Add warning radius circle if applicable
      if (building.warningRadius > 0) {
        const circle = L.circle([building.lat, building.lng], {
          color:
            building.status === "critical"
              ? "#ef4444"
              : building.status === "warning"
              ? "#eab308"
              : "#22c55e",
          fillColor:
            building.status === "critical"
              ? "#ef4444"
              : building.status === "warning"
              ? "#eab308"
              : "#22c55e",
          fillOpacity: 0.15,
          radius: building.warningRadius,
          weight: 2,
          dashArray: "5, 5",
        }).addTo(map);

        circlesRef.current.push(circle);
      }
    });

    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [buildings, onBuildingSelect]);

  return <div id="structural-map" style={{ width: "100%", height: "100%" }} />;
}
