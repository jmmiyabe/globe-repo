"use client"

import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EvacuationCapacity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          Evacuation Capacity
        </CardTitle>
        <CardDescription>Population and shelter status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { center: "Main Shelter (School)", capacity: 450, current: 385, status: "active" },
          { center: "Community Hall", capacity: 200, current: 156, status: "active" },
          { center: "Sports Complex", capacity: 600, current: 423, status: "active" },
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.center}</span>
              <span className="text-xs text-muted-foreground">
                {item.current}/{item.capacity}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full"
                style={{ width: `${(item.current / item.capacity) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
