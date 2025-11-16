// components/dashboard/citizen-emergency-prep.tsx

"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { AlertTriangle, Users, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// ⬇ Leaflet Map (no functions, just a blank map)
const SimpleMap = dynamic(() => import("./SimpleMap"), { ssr: false });

export function CitizenEmergencyPrep() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Emergency Preparedness
            </h1>
          </div>
          <p className="text-muted-foreground">
            Know your evacuation routes and emergency capacity
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

        {/* ✅ REPLACED BEST ROUTES WITH A LEAFLET MAP */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Leaflet Evacuation Map
            </CardTitle>
            <CardDescription>
              View the area map for evacuation visualization.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-border">
              <SimpleMap />
            </div>
          </CardContent>
        </Card>

        {/* Other sections unchanged */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Evacuation Shelter Capacity
              </CardTitle>
              <CardDescription>
                Current availability at shelters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Community Center A",
                  capacity: 450,
                  available: 120,
                  utilization: 73,
                },
                {
                  name: "School Gymnasium B",
                  capacity: 300,
                  available: 45,
                  utilization: 85,
                },
                {
                  name: "Sports Complex",
                  capacity: 600,
                  available: 250,
                  utilization: 58,
                },
                {
                  name: "Community Hall C",
                  capacity: 200,
                  available: 200,
                  utilization: 0,
                },
              ].map((shelter, i) => (
                <div
                  key={i}
                  className="p-3 bg-muted rounded-lg border border-border"
                >
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
                  <p className="text-xs text-muted-foreground mt-1">
                    {shelter.utilization}% utilized
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                Emergency Contact Services
              </CardTitle>
              <CardDescription>
                Quick access to emergency numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  service: "Main Emergency Line",
                  number: "111",
                  description: "Fire, Police, Medical",
                },
                {
                  service: "Search & Rescue",
                  number: "112",
                  description: "Rescue operations",
                },
                {
                  service: "Medical Emergency",
                  number: "113",
                  description: "Ambulance services",
                },
                {
                  service: "Fire Department",
                  number: "114",
                  description: "Fire emergencies",
                },
                {
                  service: "Police Non-Emergency",
                  number: "115",
                  description: "Police assistance",
                },
                {
                  service: "Disaster Management",
                  number: "116",
                  description: "Natural disaster support",
                },
              ].map((contact, i) => (
                <div
                  key={i}
                  className="p-3 bg-muted rounded-lg border border-border flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold">{contact.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {contact.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono"
                  >
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
