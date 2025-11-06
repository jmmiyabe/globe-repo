"use client"

import { MapPin, AlertTriangle, Navigation, Users, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"

export function CitizenEmergencyPrep() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Emergency Preparedness</h1>
          </div>
          <p className="text-muted-foreground">Know your evacuation routes and emergency capacity</p>
        </div>

        {/* Emergency Routes */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-secondary" />
              Best Emergency Routes
            </CardTitle>
            <CardDescription>Recommended evacuation paths during emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Primary Route - North Exit",
                description: "Main highway exit via main road",
                status: "safe",
                distance: "2.5 km",
                time: "8-12 min",
              },
              {
                name: "Secondary Route - East Bypass",
                description: "Alternative route through residential area",
                status: "safe",
                distance: "3.2 km",
                time: "10-15 min",
              },
              {
                name: "Emergency Route - South Back Road",
                description: "Local back roads for overflow traffic",
                status: "caution",
                distance: "4.1 km",
                time: "12-18 min",
              },
            ].map((route, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold">{route.name}</p>
                    <p className="text-xs text-muted-foreground">{route.description}</p>
                  </div>
                  <StatusBadge
                    level={route.status === "safe" ? "safe" : "warning"}
                    label={route.status.toUpperCase()}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Distance:</span>
                    <p className="font-semibold">{route.distance}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Time:</span>
                    <p className="font-semibold">{route.time}</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    View Map
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Evacuation Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Evacuation Shelter Capacity
              </CardTitle>
              <CardDescription>Current availability at shelters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Community Center A", capacity: 450, available: 120, utilization: 73 },
                { name: "School Gymnasium B", capacity: 300, available: 45, utilization: 85 },
                { name: "Sports Complex", capacity: 600, available: 250, utilization: 58 },
                { name: "Community Hall C", capacity: 200, available: 200, utilization: 0 },
              ].map((shelter, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">{shelter.name}</p>
                    <span className="text-xs font-semibold">
                      {shelter.available}/{shelter.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                    <div
                      className="bg-secondary rounded-full h-2 transition-all"
                      style={{ width: `${shelter.utilization}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{shelter.utilization}% utilized</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                Emergency Contact Services
              </CardTitle>
              <CardDescription>Quick access to emergency numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { service: "Main Emergency Line", number: "111", description: "Fire, Police, Medical" },
                { service: "Search & Rescue", number: "112", description: "Rescue operations" },
                { service: "Medical Emergency", number: "113", description: "Ambulance services" },
                { service: "Fire Department", number: "114", description: "Fire emergencies" },
                { service: "Police Non-Emergency", number: "115", description: "Police assistance" },
                { service: "Disaster Management", number: "116", description: "Natural disaster support" },
              ].map((contact, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{contact.service}</p>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                    </div>
                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono">
                      {contact.number}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12">
                <Phone className="h-4 w-4" />
                CONTACT Emergency Services
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 h-12">
                <MapPin className="h-4 w-4" />
                Find Nearest Shelter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
