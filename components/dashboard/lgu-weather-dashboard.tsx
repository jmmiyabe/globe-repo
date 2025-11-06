"use client"

import { Cloud, Wind, Eye, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AreaWeather {
  area: string
  condition: string
  temp: number
  humidity: number
  windSpeed: number
  visibility: number
  alert: "critical" | "warning" | "safe"
}

const areas: AreaWeather[] = [
  {
    area: "North District",
    condition: "Heavy Rain",
    temp: 24,
    humidity: 92,
    windSpeed: 45,
    visibility: 2,
    alert: "critical",
  },
  {
    area: "Central District",
    condition: "Moderate Rain",
    temp: 26,
    humidity: 85,
    windSpeed: 35,
    visibility: 5,
    alert: "warning",
  },
  {
    area: "East District",
    condition: "Light Rain",
    temp: 27,
    humidity: 78,
    windSpeed: 25,
    visibility: 8,
    alert: "warning",
  },
  {
    area: "South District",
    condition: "Cloudy",
    temp: 28,
    humidity: 70,
    windSpeed: 15,
    visibility: 12,
    alert: "safe",
  },
  {
    area: "West District",
    condition: "Clear",
    temp: 29,
    humidity: 65,
    windSpeed: 10,
    visibility: 15,
    alert: "safe",
  },
]

function getAlertColor(alert: string) {
  switch (alert) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "warning":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "safe":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    default:
      return "bg-gray-500/20 text-gray-400"
  }
}

export function LguWeatherDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Cloud className="h-8 w-8 text-primary" />
            LGU Weather Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Real-time area-based weather status and alerts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">1</div>
              <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Warning Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">2</div>
              <p className="text-xs text-muted-foreground mt-1">Elevated conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Safe Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">2</div>
              <p className="text-xs text-muted-foreground mt-1">Normal conditions</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">2 min ago</div>
              <p className="text-xs text-muted-foreground mt-1">Real-time data</p>
            </CardContent>
          </Card>
        </div>

        {/* Area Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Area-Based Weather Status</CardTitle>
            <CardDescription>Current conditions across all monitored districts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areas.map((area) => (
                <div
                  key={area.area}
                  className={`p-4 rounded-lg border ${getAlertColor(area.alert)} flex items-start justify-between`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{area.area}</h3>
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
                    <AlertTriangle className="h-6 w-6 text-red-400 mt-1 ml-4 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
