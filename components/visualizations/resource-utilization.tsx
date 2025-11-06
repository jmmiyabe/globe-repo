"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const resourceData = [
  { name: "Ambulances", value: 12, color: "hsl(var(--color-chart-1))" },
  { name: "Rescue Teams", value: 8, color: "hsl(var(--color-chart-2))" },
  { name: "Police Units", value: 15, color: "hsl(var(--color-chart-3))" },
  { name: "Fire Trucks", value: 6, color: "hsl(var(--color-chart-4))" },
]

export function ResourceUtilization() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Active Resources</CardTitle>
        <CardDescription>Distribution of emergency response units</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {resourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
