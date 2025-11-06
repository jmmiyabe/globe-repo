"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const alertData = [
  { zone: "North", critical: 5, warning: 8, caution: 12 },
  { zone: "South", critical: 2, warning: 4, caution: 9 },
  { zone: "East", critical: 3, warning: 6, caution: 7 },
  { zone: "West", critical: 1, warning: 2, caution: 4 },
  { zone: "Central", critical: 4, warning: 7, caution: 11 },
]

export function AlertDistribution() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Alert Distribution by Zone</CardTitle>
        <CardDescription>Alert levels across different geographic zones</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={alertData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="zone" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            />
            <Legend />
            <Bar dataKey="critical" name="Critical" fill="hsl(var(--color-status-critical))" />
            <Bar dataKey="warning" name="Warning" fill="hsl(var(--color-status-warning))" />
            <Bar dataKey="caution" name="Caution" fill="hsl(var(--color-chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
