"use client"

import { Cloud, CloudRain, Wind, Droplets } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WeatherStatus() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-accent" />
          Area-based Weather Status
        </CardTitle>
        <CardDescription>Real-time monitoring across affected areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {[
            { area: "North Zone", condition: "Heavy Rain", temp: "24°C", wind: "45 km/h", risk: "CRITICAL" },
            { area: "South Zone", condition: "Moderate Rain", temp: "25°C", wind: "32 km/h", risk: "WARNING" },
            { area: "East Zone", condition: "Light Rain", temp: "26°C", wind: "20 km/h", risk: "CAUTION" },
            { area: "West Zone", condition: "Clearing", temp: "27°C", wind: "15 km/h", risk: "SAFE" },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm">{item.area}</span>
                <CloudRain className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">{item.condition}</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    <span>{item.wind}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>{item.temp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
