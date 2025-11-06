"use client"

import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"

export function SearchAndRescue() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent" />
          Search & Rescue Reports
        </CardTitle>
        <CardDescription>Active rescue operations and requests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { id: "SAR-001", location: "Riverside District", status: "in-progress", priority: "CRITICAL" },
          { id: "SAR-002", location: "Mountain Area", status: "standby", priority: "WARNING" },
          { id: "SAR-003", location: "Urban Zone", status: "completed", priority: "SAFE" },
        ].map((item, i) => (
          <div key={i} className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-accent">{item.id}</span>
              <StatusBadge
                level={item.priority === "CRITICAL" ? "critical" : item.priority === "WARNING" ? "warning" : "safe"}
                label={item.priority}
              />
            </div>
            <p className="text-sm text-muted-foreground">{item.location}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
