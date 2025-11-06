"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ActionHistoryItem {
  id: string
  action: string
  actor: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  details?: string
}

interface ActionHistoryProps {
  title?: string
  items: ActionHistoryItem[]
  maxItems?: number
}

const statusColors = {
  completed: "bg-status-safe/20 text-status-safe",
  pending: "bg-status-warning/20 text-status-warning",
  failed: "bg-status-critical/20 text-status-critical",
}

export function ActionHistory({ title = "Action History", items, maxItems = 10 }: ActionHistoryProps) {
  const displayItems = items.slice(0, maxItems)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Recent emergency response actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayItems.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No actions recorded</p>
          ) : (
            displayItems.map((item) => (
              <div key={item.id} className="p-3 bg-muted rounded-lg border border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{item.action}</p>
                      <Badge variant="outline" className={statusColors[item.status]}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">by {item.actor}</p>
                    {item.details && <p className="text-xs text-muted-foreground mt-1">{item.details}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
