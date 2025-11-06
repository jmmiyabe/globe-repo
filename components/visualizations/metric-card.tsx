import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  icon?: React.ReactNode
  label: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  color?: "critical" | "warning" | "safe" | "default"
}

export function MetricCard({ icon, label, value, change, color = "default" }: MetricCardProps) {
  const colorClasses = {
    critical: "text-status-critical",
    warning: "text-status-warning",
    safe: "text-status-safe",
    default: "text-primary",
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
            {change && (
              <p className={`text-xs mt-2 ${change.isPositive ? "text-status-safe" : "text-status-critical"}`}>
                {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}% from yesterday
              </p>
            )}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
