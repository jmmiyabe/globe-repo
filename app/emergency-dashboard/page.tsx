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

export default function EmergencyDashboard() {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Emergency Respone Center
            </h1>
          </div>
          <p className="text-muted-foreground">
            Real-time emergency coordination and response management
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{" "}
            {now.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Weather Status */}
          <div className="lg:col-span-2">
            <WeatherStatus />
          </div>

          {/* Status Overview */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Alert Level</span>
                  <StatusBadge level="critical" label="CRITICAL" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Evacuation</span>
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

        {/* Evacuation & Search & Rescue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <EvacuationCapacity />
          <SearchAndRescue />
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
                { route: "Route Charlie", status: "CONGESTED", capacity: "65%" },
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
                    <span className="text-sm text-muted-foreground">{item.capacity}</span>
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
