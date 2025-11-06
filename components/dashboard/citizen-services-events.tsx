"use client"

import { Calendar, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"

export function CitizenServicesEvents() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Services & Community Events</h1>
          </div>
          <p className="text-muted-foreground">Access local services and register for community activities</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Service Availability */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Service Availability
              </CardTitle>
              <CardDescription>Operating clinics and consultation centers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Community Clinic A", type: "Medical", status: "operational", hours: "24/7" },
                { name: "Health Center B", type: "Consultation", status: "operational", hours: "08:00-20:00" },
                { name: "Dental Clinic", type: "Dental", status: "closed", hours: "Opens 09:00" },
                { name: "Mental Health Support", type: "Counseling", status: "operational", hours: "10:00-18:00" },
              ].map((service, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.type}</p>
                    </div>
                    <StatusBadge
                      level={service.status === "operational" ? "safe" : "warning"}
                      label={service.status.toUpperCase()}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Hours: {service.hours}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ongoing Projects */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Ongoing Projects & Events
              </CardTitle>
              <CardDescription>Community initiatives and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Community Relief Distribution", date: "Today 14:00", type: "Relief", participants: 245 },
                { title: "Free Health Screening Drive", date: "Tomorrow 09:00", type: "Health", participants: 120 },
                { title: "Infrastructure Repair Phase 1", date: "Next Week", type: "Infrastructure", participants: 89 },
                { title: "Youth Livelihood Training", date: "Dec 15-20", type: "Training", participants: 156 },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{item.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.participants} registered</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Book Services */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Book Local Services</CardTitle>
            <CardDescription>Schedule appointments and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: "Medical Consultation", icon: "🏥" },
                { name: "Document Processing", icon: "📋" },
                { name: "Livelihood Training", icon: "🎓" },
              ].map((service, i) => (
                <Button key={i} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12">
                  <span>{service.icon}</span>
                  {service.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Register for Events */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Event Registration
            </CardTitle>
            <CardDescription>Join upcoming community activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: "Community Relief Distribution", date: "Dec 10", capacity: "Spaces: 50/100" },
                { event: "Free Health Screening", date: "Dec 11", capacity: "Spaces: 30/75" },
                { event: "Emergency Preparedness Workshop", date: "Dec 12", capacity: "Spaces: 20/40" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-semibold">{item.event}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} • {item.capacity}
                    </p>
                  </div>
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
