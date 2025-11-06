"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type React from "react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  status?: "operational" | "limited" | "closed"
  actionLabel?: string
  onAction?: () => void
  details?: {
    label: string
    value: string | React.ReactNode
  }[]
}

const statusColors = {
  operational: "text-status-safe",
  limited: "text-status-warning",
  closed: "text-status-critical",
}

const statusBgColors = {
  operational: "bg-status-safe/10",
  limited: "bg-status-warning/10",
  closed: "bg-status-critical/10",
}

export function ServiceCard({ icon, title, description, status, actionLabel, onAction, details }: ServiceCardProps) {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-muted-foreground mt-1">{icon}</div>
            <div className="flex-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          {status && (
            <div
              className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${statusBgColors[status]} ${statusColors[status]}`}
            >
              {status.toUpperCase()}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {details && (
          <div className="space-y-2 mb-4 flex-1">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{detail.label}</span>
                <span className="font-semibold">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        {actionLabel && (
          <Button onClick={onAction} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
