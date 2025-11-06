"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface StatusBarItem {
  label: string
  value: string | React.ReactNode
  color?: "critical" | "warning" | "safe" | "default"
}

interface StatusBarProps {
  items: StatusBarItem[]
  action?: {
    label: string
    onClick: () => void
  }
}

export function StatusBar({ items, action }: StatusBarProps) {
  const colorMap = {
    critical: "bg-status-critical/10 text-status-critical",
    warning: "bg-status-warning/10 text-status-warning",
    safe: "bg-status-safe/10 text-status-safe",
    default: "bg-muted text-muted-foreground",
  }

  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border p-3 md:p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">
                {item.label}:
              </span>
              <span
                className={`text-xs md:text-sm font-semibold px-2 py-1 rounded whitespace-nowrap ${colorMap[item.color || "default"]}`}
              >
                {item.value}
              </span>
              {index < items.length - 1 && <div className="h-4 w-px bg-border mx-1" />}
            </div>
          ))}
        </div>
        {action && (
          <Button size="sm" variant="outline" onClick={action.onClick} className="ml-auto shrink-0 bg-transparent">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
