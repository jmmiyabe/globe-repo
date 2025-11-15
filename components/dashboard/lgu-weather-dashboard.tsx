"use client";

import { useEffect, useState } from "react";
import { Cloud, Wind, Eye, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

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

// Default areas
const defaultAreas: AreaWeather[] = [
  { area: "ZONE 10", lat: 14.54491, lon: 120.98745, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 1", lat: 14.55833, lon: 120.99045, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 2", lat: 14.552668, lon: 120.993157, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 3", lat: 14.553120, lon: 120.999931, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 4", lat: 14.546437, lon: 121.003272, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 5", lat: 14.544992, lon: 121.007427, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "ZONE 9", lat: 14.546527, lon: 120.996138, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "ZONE 16", lat: 14.537180, lon: 121.001782, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "MEGA ZONE 6", lat: 14.533341, lon: 121.008240, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
  { area: "ZONE 20", lat: 14.528690, lon: 121.016910, condition: "", temp: 0, humidity: 0, windSpeed: 0, visibility: 0, alert: "safe" },
];

// Map import
const WeatherMapPasayDynamic = dynamic(
  () => import("./WeatherMapPasay").then((mod) => mod.WeatherMapPasay),
  { ssr: false }
);

export function LguWeatherDashboard() {
  const [areas, setAreas] = useState<AreaWeather[]>(defaultAreas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const updatedAreas = await Promise.all(
          defaultAreas.map(async (area) => {
            // Mock data for demo
            const current = {
              condition: "Cloudy",
              temperature: Math.floor(Math.random() * 5 + 28),
              humidity: Math.floor(Math.random() * 20 + 70),
              wind_speed: Math.floor(Math.random() * 15 + 5),
              visibility: Math.floor(Math.random() * 5 + 8),
              precipitation: Math.random() * 10,
            };
            if (area.area === "ZONE 10") {
              current.precipitation = 25;
              current.condition = "Heavy Rain";
            } else if (area.area === "MEGA ZONE 3") {
              current.wind_speed = 30;
              current.condition = "Strong Winds";
            }

            let alert: AreaWeather["alert"] = "safe";
            if (current.precipitation > 20 || current.wind_speed > 40) alert = "critical";
            else if (current.precipitation > 5 || current.wind_speed > 20) alert = "warning";

            return {
              ...area,
              condition: current.condition,
              temp: current.temperature,
              humidity: current.humidity,
              windSpeed: current.wind_speed,
              visibility: current.visibility,
              alert,
            };
          })
        );
        setAreas(updatedAreas);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const criticalCount = (areas || []).filter(a => a.alert === "critical").length;
  const warningCount = (areas || []).filter(a => a.alert === "warning").length;
  const safeCount = (areas || []).filter(a => a.alert === "safe").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Cloud className="h-8 w-8 text-primary" />
            LGU Weather Monitoring Dashboard - Pasay
          </h1>
          <p className="text-muted-foreground mt-2">Real-time area-based weather status and alerts</p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{" "}
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
          </p>
        </div>

        {/* Map + Summary */}
        <div className="lg:flex lg:gap-4">
          <Card className="bg-card border-border lg:flex-2 lg:flex lg:flex-col">
            <CardHeader>
              <CardTitle>Pasay Weather Status Map</CardTitle>
              <CardDescription>Live wind, clouds, precipitation, and temperature data</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 min-h-[400px]">
              <WeatherMapPasayDynamic areas={areas} />
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="flex flex-col gap-4 lg:flex-1">
            {[
              { title: "Critical Areas", count: criticalCount, color: "red", description: "Requiring immediate attention" },
              { title: "Warning Areas", count: warningCount, color: "yellow", description: "Elevated conditions" },
              { title: "Safe Areas", count: safeCount, color: "green", description: "Normal conditions" },
              { title: "Last Update", count: loading ? "Updating..." : "2 min ago", color: "gray", description: "Real-time data" },
            ].map(card => (
              <Card key={card.title} className={`bg-card border-l-4 border-${card.color}-500/50 flex-1`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-center">
                  <div className={`text-3xl font-bold text-${card.color}-400`}>{card.count}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fixed Table */}
        <Card className="bg-card border-border overflow-x-auto shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle>Area-Based Weather Status</CardTitle>
            <CardDescription>Current conditions across all monitored districts in Pasay</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Area</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Condition</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Temperature</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Humidity</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[100px]">Wind</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 min-w-[100px]">Visibility</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {areas.map((area, index) => (
                  <tr key={area.area} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                    <td className="px-4 py-2 font-semibold text-foreground">{area.area}</td>
                    <td className="px-4 py-2">
                      <Badge className={`rounded-full px-2 py-1 text-xs
                        ${area.alert === "critical" ? "bg-red-500/30 text-red-700" :
                          area.alert === "warning" ? "bg-yellow-500/30 text-yellow-700" :
                          "bg-green-500/30 text-green-700"}`}>
                        {area.condition}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">{area.temp}°C</td>
                    <td className="px-4 py-2">{area.humidity}%</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                            <Wind className="h-4 w-4 inline-block align-middle" />
                            {area.windSpeed} km/h
                        </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                            <Eye className="h-4 w-4 inline-block align-middle" />
                            {area.visibility} km
                        </span>
                    </td>
                    <td className="px-4 py-2">
                        {area.alert === "critical" && (
                            <span className="inline-flex items-center gap-1 text-red-500">
                                <AlertTriangle className="h-5 w-5" />
                                Critical
                            </span>
                        )}
                        {area.alert === "warning" && (
                            <span className="inline-flex items-center gap-1 text-yellow-600">
                                <AlertTriangle className="h-5 w-5" />
                                Warning
                            </span>
                        )}
                        {area.alert === "safe" && <span className="text-green-600">Safe</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}