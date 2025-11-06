"use client"

import type React from "react"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickCallService {
  id: string
  name: string
  number: string
  description: string
  icon?: React.ReactNode
}

interface QuickCallPanelProps {
  title?: string
  services: QuickCallService[]
  onCall?: (service: QuickCallService) => void
}

export function QuickCallPanel({ title = "Quick Call Services", services, onCall }: QuickCallPanelProps) {
  const handleCall = (service: QuickCallService) => {
    onCall?.(service)
    // In a real app, this would trigger an actual phone call
    console.log(`Calling ${service.name} at ${service.number}`)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{service.name}</p>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-accent">{service.number}</span>
              <Button size="sm" onClick={() => handleCall(service)} className="gap-2 bg-primary hover:bg-primary/90">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Pre-configured emergency services
export const DEFAULT_EMERGENCY_SERVICES: QuickCallService[] = [
  {
    id: "emergency",
    name: "Emergency Line",
    number: "911",
    description: "Main emergency services",
  },
  {
    id: "fire",
    name: "Fire Department",
    number: "1-124",
    description: "Fire & rescue services",
  },
  {
    id: "medical",
    name: "Medical Services",
    number: "1-123",
    description: "Ambulance & medical help",
  },
  {
    id: "police",
    name: "Police Department",
    number: "1-125",
    description: "Law enforcement",
  },
]
