"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const evacuationData = [
  { shelter: "Main School", capacity: 450, current: 385, available: 65 },
  { shelter: "Community Hall", capacity: 200, current: 156, available: 44 },
  { shelter: "Sports Complex", capacity: 600, current: 423, available: 177 },
  { shelter: "Church Hall", capacity: 300, current: 245, available: 55 },
]

export function EvacuationStatsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Shelter Capacity Status</CardTitle>
        <CardDescription>Current occupancy vs available capacity across shelters</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={evacuationData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="shelter" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            />
            <Legend />
            <Bar dataKey="current" name="Currently Occupied" fill="hsl(var(--color-chart-1))" />
            <Bar dataKey="available" name="Available Space" fill="hsl(var(--color-chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
