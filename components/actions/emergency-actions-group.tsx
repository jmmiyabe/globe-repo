"use client"

import type React from "react"

import { AlertCircle, Phone, MessageSquare, MapPin, Users, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActionItem {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  color: "critical" | "warning" | "primary" | "secondary"
  onClick: () => void
}

interface EmergencyActionsGroupProps {
  title?: string
  description?: string
  actions: ActionItem[]
  columns?: 2 | 3
  variant?: "default" | "compact"
}

const colorMap = {
  critical: "bg-status-critical hover:bg-status-critical/90 text-white",
  warning: "bg-status-warning hover:bg-status-warning/90 text-white",
  primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
  secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
}

export function EmergencyActionsGroup({
  title,
  description,
  actions,
  columns = 3,
  variant = "default",
}: EmergencyActionsGroupProps) {
  const columnClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"

  if (variant === "compact") {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-2`}>
        {actions.map((action) => (
          <Button key={action.id} onClick={action.onClick} className={`${colorMap[action.color]} gap-2 h-10`}>
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Card className="bg-card border-border">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className={`grid grid-cols-1 ${columnClass} gap-3`}>
          {actions.map((action) => (
            <Button key={action.id} onClick={action.onClick} className={`${colorMap[action.color]} gap-2 h-12`}>
              {action.icon}
              <div className="text-left">
                <div className="text-sm font-semibold">{action.label}</div>
                {action.description && <div className="text-xs opacity-90">{action.description}</div>}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Pre-configured emergency actions
export function DefaultEmergencyActions() {
  const actions: ActionItem[] = [
    {
      id: "warning",
      icon: <AlertCircle className="h-4 w-4" />,
      label: "Activate Warning",
      description: "Send emergency alert",
      color: "critical",
      onClick: () => console.log("Warning activated"),
    },
    {
      id: "services",
      icon: <Phone className="h-4 w-4" />,
      label: "Contact Emergency",
      description: "Call response teams",
      color: "critical",
      onClick: () => console.log("Services contacted"),
    },
    {
      id: "broadcast",
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Broadcast Message",
      description: "Notify communities",
      color: "warning",
      onClick: () => console.log("Message broadcast"),
    },
    {
      id: "evacuation",
      icon: <MapPin className="h-4 w-4" />,
      label: "Start Evacuation",
      description: "Open shelters",
      color: "warning",
      onClick: () => console.log("Evacuation started"),
    },
    {
      id: "coordinate",
      icon: <Users className="h-4 w-4" />,
      label: "Coordinate Teams",
      description: "Deploy resources",
      color: "primary",
      onClick: () => console.log("Teams coordinating"),
    },
    {
      id: "comms",
      icon: <Radio className="h-4 w-4" />,
      label: "Enable Communications",
      description: "Activate channels",
      color: "primary",
      onClick: () => console.log("Communications enabled"),
    },
  ]

  return (
    <EmergencyActionsGroup
      title="Emergency Actions"
      description="Activate emergency services and notify communities"
      actions={actions}
    />
  )
}
