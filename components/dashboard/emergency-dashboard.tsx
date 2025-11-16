"use client";

import {
  AlertTriangle,
  MapPin,
  AlertCircle,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { WeatherStatus } from "@/components/dashboard/weather-status";
import { EvacuationCapacity } from "@/components/dashboard/evacuation-capacity";
import { SearchAndRescue } from "@/components/dashboard/search-and-rescue";

export function EmergencyDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Weather Response Command Center
            </h1>
          </div>
          <p className="text-muted-foreground">
            Real-time emergency coordination and response management
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        {/* Weather Status */}
        <div className="mb-6">
          <WeatherStatus />
        </div>

        {/* Evacuation & Search & Rescue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <EvacuationCapacity />
          <SearchAndRescue />
        </div>

        {/* Urgent Alerts */}
        <Card className="border-border mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  Urgent Alerts
                </CardTitle>
                <CardDescription>
                  Critical situations requiring immediate attention
                </CardDescription>
              </div>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md text-sm font-medium">
                3 Active
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    North District: Heavy Flooding
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Water levels rising rapidly. 342 evacuees sheltered. 15 SAR
                    operations active.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">
                    2 min ago
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                >
                  View Details
                </Button>
              </div>
              <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Central District: Shelter Capacity
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Central School Gymnasium at 68% capacity. Secondary shelter
                    ready for activation.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">
                    8 min ago
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                >
                  Activate Secondary
                </Button>
              </div>
              <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    West District: Crime Alert
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Increased suspicious activity reported. 2 additional patrols
                    deployed.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">
                    15 min ago
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                >
                  Review Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Response Status</CardTitle>
              <CardDescription>Current operational metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Weather Resilience
                    </span>
                    <span className="text-sm text-primary font-semibold">
                      68%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Resource Availability
                    </span>
                    <span className="text-sm text-green-400 font-semibold">
                      85%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Response Time
                    </span>
                    <span className="text-sm text-yellow-400 font-semibold">
                      72%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Overview - moved from earlier position */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Alert Level
                  </span>
                  <StatusBadge level="critical" label="CRITICAL" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Evacuation
                  </span>
                  <StatusBadge level="warning" label="ACTIVE" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Routes</span>
                  <StatusBadge level="safe" label="CLEAR" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Emergency Actions</CardTitle>
            <CardDescription>
              Activate emergency services and notify communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-12">
                <AlertCircle className="h-4 w-4" />
                ACTIVATE Community Warning Speakers
              </Button>
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2 h-12">
                <Phone className="h-4 w-4" />
                CONTACT Emergency Services
              </Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 h-12">
                <MessageSquare className="h-4 w-4" />
                INFORM Nearby Communities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Routes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Best Emergency Routes
            </CardTitle>
            <CardDescription>
              Recommended evacuation and access routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { route: "Route Alpha", status: "CLEAR", capacity: "95%" },
                { route: "Route Beta", status: "CLEAR", capacity: "82%" },
                {
                  route: "Route Charlie",
                  status: "CONGESTED",
                  capacity: "65%",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium">{item.route}</span>
                  <div className="flex items-center gap-3">
                    <StatusBadge
                      level={item.status === "CLEAR" ? "safe" : "warning"}
                      label={item.status}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
