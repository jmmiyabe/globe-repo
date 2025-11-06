"use client"

import { Phone, MapPin, AlertCircle, Calendar, Briefcase, Siren } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"

export function CitizenHub() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Siren className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Community Hub</h1>
          </div>
          <p className="text-muted-foreground">
            Your central hub for emergency services, alerts, and community information
          </p>
        </div>

        {/* Emergency Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Emergency Services */}
          <Card className="bg-accent/10 border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Siren className="h-5 w-5" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-10">
                <Phone className="h-4 w-4" />
                CALL 111
              </Button>
              <p className="text-xs text-muted-foreground text-center">Fire • Police • Medical</p>
            </CardContent>
          </Card>

          {/* Evacuation Info */}
          <Card className="bg-secondary/10 border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <AlertCircle className="h-5 w-5" />
                Evacuation Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-secondary mb-2">450/600</p>
              <p className="text-xs text-muted-foreground">Shelters available</p>
              <Button size="sm" className="w-full mt-2 bg-secondary hover:bg-secondary/90">
                View Shelters
              </Button>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBadge level="caution" label="ALERT ACTIVE" />
              <p className="text-xs text-muted-foreground mt-2">Check latest updates and advisories</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* LGU Hotline */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                LGU Hotline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Main Emergency Line</p>
                  <p className="text-2xl font-mono font-bold text-primary">1-1-1</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Medical</p>
                    <p className="font-mono text-sm font-semibold">1-123</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fire</p>
                    <p className="font-mono text-sm font-semibold">1-124</p>
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Service Availability
              </CardTitle>
              <CardDescription>Operating clinics and consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Community Clinic A", status: "operational", hours: "24/7" },
                { name: "Medical Center B", status: "operational", hours: "08:00-20:00" },
                { name: "Consultation Hub", status: "closed", hours: "Opens 06:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.hours}</p>
                  </div>
                  <StatusBadge
                    level={item.status === "operational" ? "safe" : "warning"}
                    label={item.status.toUpperCase()}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Community Info & Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Ongoing Projects/Events */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Ongoing Projects & Events
              </CardTitle>
              <CardDescription>Community initiatives and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Community Relief Distribution", date: "Today 14:00", type: "Relief" },
                { title: "Free Health Screening", date: "Tomorrow 09:00", type: "Health" },
                { title: "Infrastructure Repair Phase 1", date: "Next Week", type: "Project" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <p className="text-sm font-semibold mb-1">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{item.type}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Crime Warnings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                Crime & Safety Warnings
              </CardTitle>
              <CardDescription>Stay informed about local incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { area: "Downtown District", warning: "Increased activity reported", level: "warning" },
                { area: "Park Area", warning: "Safe - Extra patrols active", level: "safe" },
                { area: "Business Zone", warning: "Petty theft prevention campaign", level: "caution" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <p className="text-sm font-semibold mb-1">{item.area}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{item.warning}</p>
                    <StatusBadge
                      level={item.level === "warning" ? "warning" : item.level === "safe" ? "safe" : "critical"}
                      label={item.level.toUpperCase()}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Service Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Community Services</CardTitle>
            <CardDescription>Access local government services and programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12">
                <Phone className="h-4 w-4" />
                CONTACT LGU
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 h-12">
                <Calendar className="h-4 w-4" />
                REGISTER Event
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-12">
                <Briefcase className="h-4 w-4" />
                BOOK Local Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
