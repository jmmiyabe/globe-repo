"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const weatherData = [
  { time: "00:00", temperature: 24, humidity: 78, windSpeed: 15 },
  { time: "04:00", temperature: 22, humidity: 82, windSpeed: 18 },
  { time: "08:00", temperature: 20, humidity: 88, windSpeed: 32 },
  { time: "12:00", temperature: 23, humidity: 92, windSpeed: 45 },
  { time: "16:00", temperature: 25, humidity: 85, windSpeed: 38 },
  { time: "20:00", temperature: 23, humidity: 80, windSpeed: 25 },
  { time: "24:00", temperature: 22, humidity: 75, windSpeed: 20 },
]

export function AreaWeatherChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Weather Trends</CardTitle>
        <CardDescription>Temperature, humidity, and wind speed over 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weatherData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--color-chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--color-chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--color-chart-1))"
              fillOpacity={1}
              fill="url(#colorTemp)"
              name="Temperature (°C)"
            />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="hsl(var(--color-chart-2))"
              fillOpacity={1}
              fill="url(#colorHumidity)"
              name="Humidity (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
