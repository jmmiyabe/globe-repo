"use client"

import {
  Radio,
  AlertTriangle,
  Building2,
  MapPin,
  Phone,
  Send,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"

interface Shelter {
  name: string
  location: string
  capacity: number
  current: number
  status: "available" | "full" | "limited"
}

interface SuggestedResponse {
  id: string
  action: string
  priority: string
  description: string
  impact: string
}

const shelters: Shelter[] = [
  {
    name: "Central School Gymnasium",
    location: "Central District",
    capacity: 500,
    current: 342,
    status: "available",
  },
  {
    name: "Sports Complex",
    location: "North District",
    capacity: 800,
    current: 756,
    status: "limited",
  },
  {
    name: "Convention Center",
    location: "West District",
    capacity: 1200,
    current: 1200,
    status: "full",
  },
]

const suggestedResponses: SuggestedResponse[] = [
  {
    id: "RESP-001",
    action: "Activate additional shelter capacity",
    priority: "high",
    description:
      "West District shelter is at capacity. Recommend opening secondary shelter.",
    impact: "Accommodates 500+ additional evacuees",
  },
  {
    id: "RESP-002",
    action: "Deploy medical teams",
    priority: "high",
    description:
      "Multiple SAR operations require immediate medical support.",
    impact: "Provides on-site emergency medical services",
  },
  {
    id: "RESP-003",
    action: "Increase warning speaker activation",
    priority: "medium",
    description:
      "Extend community warnings to northern peripheral areas.",
    impact: "Reaches 15,000+ additional residents",
  },
]

function getCapacityColor(status: string) {
  switch (status) {
    case "full":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "limited":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "available":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    default:
      return "bg-gray-500/20 text-gray-400"
  }
}

export function LguOperationsDashboard() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Radio className="h-8 w-8 text-primary" />
            LGU Operations & Response Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Evacuation capacity, community alerts, and suggested responses
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            className="h-auto py-4 bg-primary hover:bg-primary/90 text-white"
            size="lg"
            onClick={() => setOpenModal("warning")}
          >
            <Radio className="h-5 w-5 mr-2" />
            <div className="text-left">
              <div className="font-bold">ACTIVATE Warning Speakers</div>
              <div className="text-sm opacity-90">Broadcast community alert</div>
            </div>
          </Button>

          <Button
            className="h-auto py-4 bg-orange-600 hover:bg-orange-700 text-white"
            size="lg"
            onClick={() => setOpenModal("emergency")}
          >
            <Phone className="h-5 w-5 mr-2" />
            <div className="text-left">
              <div className="font-bold">CONTACT Emergency Services</div>
              <div className="text-sm opacity-90">Call nearest responders</div>
            </div>
          </Button>

          <Button
            className="h-auto py-4 bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
            onClick={() => setOpenModal("inform")}
          >
            <Send className="h-5 w-5 mr-2" />
            <div className="text-left">
              <div className="font-bold">INFORM Nearby Communities</div>
              <div className="text-sm opacity-90">Send updates to neighboring LGUs</div>
            </div>
          </Button>
        </div>

        {/* Evacuation Capacity */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle>Evacuation Capacity Status</CardTitle>
            <CardDescription>
              Real-time shelter occupancy and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shelters.map((shelter) => {
                const percentage = (shelter.current / shelter.capacity) * 100
                return (
                  <div
                    key={shelter.name}
                    className={`p-4 rounded-lg border ${getCapacityColor(
                      shelter.status
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {shelter.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            {shelter.location}
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          shelter.status === "full"
                            ? "bg-red-500/20 text-red-700 border border-red-600"
                            : shelter.status === "limited"
                            ? "bg-yellow-400/20 text-yellow-800 border border-yellow-500"
                            : "bg-green-500/20 text-green-800 border border-green-600"
                        }`}
                      >
                        {shelter.status.toUpperCase()}
                      </Badge>

                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {shelter.current} / {shelter.capacity} evacuees
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {Math.round(percentage)}%
                      </span>
                    </div>

                    <div className="w-full bg-card/40 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          shelter.status === "full"
                            ? "bg-red-500"
                            : shelter.status === "limited"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Total Capacity: </span>2,500 |{" "}
                <span className="font-semibold">Currently Housed:</span> 2,298 |{" "}
                <span className="font-semibold">Available Capacity:</span> 202
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Responses */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Suggested Responses</CardTitle>
            <CardDescription>
              Recommended actions based on current emergency situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedResponses.map((response) => (
                <div
                  key={response.id}
                  className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {response.action}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {response.description}
                      </p>
                    </div>
                    <Badge className="bg-primary/20 text-primary text-xs">
                      {response.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Impact: </span>
                      <span className="font-semibold text-foreground">
                        {response.impact}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setOpenModal(response.id)}
                    >
                      Implement
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MODALS */}
      <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Action Executed</DialogTitle>
            <DialogDescription>
              {openModal === "warning" &&
                "Warning speakers have been activated in designated zones."}
              {openModal === "emergency" &&
                "Emergency services have been contacted and dispatched."}
              {openModal === "inform" &&
                "Notifications sent to nearby communities successfully."}
              {openModal?.startsWith("RESP-") &&
                "Suggested response implemented successfully."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
