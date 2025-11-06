"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const incidentData = [
  { hour: "00:00", incidents: 2, resolved: 1, pending: 1 },
  { hour: "04:00", incidents: 5, resolved: 2, pending: 3 },
  { hour: "08:00", incidents: 12, resolved: 4, pending: 8 },
  { hour: "12:00", incidents: 18, resolved: 8, pending: 10 },
  { hour: "16:00", incidents: 24, resolved: 14, pending: 10 },
  { hour: "20:00", incidents: 22, resolved: 18, pending: 4 },
  { hour: "24:00", incidents: 20, resolved: 19, pending: 1 },
]

export function IncidentTimeline() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Incident Response Timeline</CardTitle>
        <CardDescription>Incidents reported, resolved, and pending throughout the day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="hour" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="incidents"
              stroke="hsl(var(--color-status-critical))"
              name="Total Incidents"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="hsl(var(--color-status-safe))"
              name="Resolved"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="hsl(var(--color-status-warning))"
              name="Pending"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
