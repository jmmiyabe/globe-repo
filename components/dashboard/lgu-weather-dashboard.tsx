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

interface AreaWeather {
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

// Initial areas with coordinates
const initialAreas: AreaWeather[] = [
  {
    area: "Malibay",
    lat: 14.548,
    lon: 120.995,
    condition: "",
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    alert: "safe",
  },
  {
    area: "Baclaran",
    lat: 14.537,
    lon: 120.999,
    condition: "",
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    alert: "safe",
  },
  {
    area: "Maricaban",
    lat: 14.54,
    lon: 120.993,
    condition: "",
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    alert: "safe",
  },
  {
    area: "Pasay City Hall Area",
    lat: 14.556,
    lon: 120.998,
    condition: "",
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    alert: "safe",
  },
  {
    area: "Villamor Air Base",
    lat: 14.53,
    lon: 120.996,
    condition: "",
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    alert: "safe",
  },
];

function getAlertColor(alert: string) {
  switch (alert) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "warning":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "safe":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

export function LguWeatherDashboard() {
  const [areas, setAreas] = useState<AreaWeather[]>(initialAreas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const updatedAreas = await Promise.all(
          initialAreas.map(async (area) => {
            const res = await fetch(
              `/api/weather?lat=${area.lat}&lon=${area.lon}`
            );
            const data = await res.json();
            const current = data.current || {};

            // Determine alert based on conditions
            let alert: AreaWeather["alert"] = "safe";
            if (current.precipitation > 20 || current.wind_speed > 40)
              alert = "critical";
            else if (current.precipitation > 5 || current.wind_speed > 20)
              alert = "warning";

            return {
              ...area,
              condition: current.condition || "Unknown",
              temp: current.temperature || 0,
              humidity: current.humidity || 0,
              windSpeed: current.wind_speed || 0,
              visibility: current.visibility || 0,
              alert,
            };
          })
        );
        setAreas(updatedAreas);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather", err);
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const criticalCount = areas.filter((a) => a.alert === "critical").length;
  const warningCount = areas.filter((a) => a.alert === "warning").length;
  const safeCount = areas.filter((a) => a.alert === "safe").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Cloud className="h-8 w-8 text-primary" />
            LGU Weather Monitoring Dashboard - Pasay
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time area-based weather status and alerts
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-l-4 border-red-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Critical Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">
                {criticalCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Requiring immediate attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-yellow-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Warning Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">
                {warningCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Elevated conditions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-green-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Safe Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {safeCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Normal conditions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-gray-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                Last Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">
                {loading ? "Updating..." : "2 min ago"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time data
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pasay Weather Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Philippine Weather Map</CardTitle>
            <CardDescription>
              Live wind and weather conditions for Philippines.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              width="100%"
              height="500"
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=kt&zoom=12&overlay=wind&product=ecmwf&level=surface&lat=14.5416&lon=120.9936&message=true"
              frameBorder="0"
              style={{ border: "none", borderRadius: "0.5rem" }}
              title="Pasay Weather Map Embed"
            ></iframe>
          </CardContent>
        </Card>

        {/* Area-Based Weather Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Area-Based Weather Status</CardTitle>
            <CardDescription>
              Current conditions across all monitored districts in Pasay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {areas.map((area) => (
              <div
                key={area.area}
                className={`p-4 rounded-lg border ${getAlertColor(
                  area.alert
                )} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">
                      {area.area}
                    </h3>
                    <Badge
                      className={`${
                        area.alert === "critical"
                          ? "bg-red-500/30 text-red-300"
                          : area.alert === "warning"
                          ? "bg-yellow-500/30 text-yellow-300"
                          : "bg-green-500/30 text-green-300"
                      }`}
                    >
                      {area.condition}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs opacity-70">Temperature</p>
                      <p className="font-semibold">{area.temp}°C</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Humidity</p>
                      <p className="font-semibold">{area.humidity}%</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">Wind</p>
                        <p className="font-semibold">{area.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">Visibility</p>
                        <p className="font-semibold">{area.visibility} km</p>
                      </div>
                    </div>
                  </div>
                </div>
                {area.alert === "critical" && (
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
