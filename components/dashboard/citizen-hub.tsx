"use client";

import {
  Phone,
  MapPin,
  AlertCircle,
  AlertTriangle,
  Calendar,
  Briefcase,
  Siren,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { useState, useEffect } from "react";

export function CitizenHub() {
  const [callStatus, setCallStatus] = useState("");
  const [shelterModal, setShelterModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = (number: string, service: string) => {
    setCallStatus(`Calling ${service} at ${number}...`);
    setTimeout(() => setCallStatus(""), 3000);
  };

  const handleViewShelters = () => {
    setShelterModal(true);
    setTimeout(() => setShelterModal(false), 5000);
  };

  const handleServiceAction = (service: string) => {
    setSelectedService(service);
    setTimeout(() => setSelectedService(""), 3000);
  };
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Siren className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Community Hub
            </h1>
          </div>
          <p className="text-muted-foreground">
            Your central hub for emergency services, alerts, and community
            information
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{" "}
            {currentTime.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
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
              <Button
                onClick={() => handleCall("911", "Emergency Services")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-10"
                title="Call 911 for immediate emergency assistance - Available 24/7"
              >
                <Phone className="h-4 w-4" />
                CALL 911
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Fire • Police • Medical
              </p>
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
              <p className="text-xs text-muted-foreground">
                Shelters available
              </p>
              <Button
                size="sm"
                onClick={handleViewShelters}
                className="w-full mt-2 bg-secondary hover:bg-secondary/90"
                title="View available evacuation centers with capacity and location details"
              >
                View Shelters
              </Button>
              {shelterModal && (
                <div className="mt-2 p-2 bg-secondary/20 rounded text-xs">
                  <p className="font-semibold">Available Shelters:</p>
                  <p>• Pasay City Sports Complex (150/200)</p>
                  <p>• Cuneta Astrodome (200/250)</p>
                  <p>• Villamor Elem. School (100/150)</p>
                </div>
              )}
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
              <StatusBadge level="warning" label="ALERT ACTIVE" />
              <p className="text-xs text-muted-foreground mt-2">
                Check latest updates and advisories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Pasay Emergency Hotlines */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                Pasay Emergency Hotlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Pasay DRRM Office
                  </p>
                  <p className="text-lg font-mono font-bold text-primary">
                    09054939111
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Fire Dept</p>
                    <p className="font-mono text-sm font-semibold">
                      117 / 831-4222
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Pasay Police
                    </p>
                    <p className="font-mono text-sm font-semibold">834-4030</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">NDRRMC</p>
                    <p className="font-mono text-sm font-semibold">8920-1911</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phil. Red Cross
                    </p>
                    <p className="font-mono text-sm font-semibold">143</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleCall("09054939111", "Pasay DRRM Office")}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  title="Quick dial to Pasay DRRM Office for disaster and emergency concerns"
                >
                  Call Now
                </Button>
                {callStatus && (
                  <div className="mt-2 p-2 bg-secondary/20 rounded text-xs text-center font-semibold">
                    {callStatus}
                  </div>
                )}
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
              <CardDescription>
                Operating clinics and consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Community Clinic A",
                  status: "operational",
                  hours: "24/7",
                },
                {
                  name: "Medical Center B",
                  status: "operational",
                  hours: "08:00-20:00",
                },
                {
                  name: "Consultation Hub",
                  status: "closed",
                  hours: "Opens 06:00",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.hours}
                    </p>
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
          {/* Community Initiatives/Activities */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Community Initiatives/Activities
              </CardTitle>
              <CardDescription>
                Local community programs and activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Pageants", type: "Event" },
                { title: "Zumba", type: "Fitness" },
                { title: "Nutrition Month", type: "Health" },
                { title: "Feeding Programs", type: "Welfare" },
                { title: "Health Programs", type: "Health" },
                { title: "Local Vegetable Planting", type: "Agriculture" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Incidents and Community Issues stacked */}
          <div className="space-y-4">
            {/* Emergency Incidents */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Emergency Incidents
                </CardTitle>
                <CardDescription className="text-xs">
                  Critical life-safety events requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    incident: "Flooding Casualties/Stranded",
                    level: "critical",
                  },
                  { incident: "Fire Spread", level: "critical" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-destructive/10 rounded-lg border border-destructive/30"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{item.incident}</p>
                      <StatusBadge
                        level={item.level as "warning" | "safe" | "critical"}
                        label={item.level.toUpperCase()}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Issues */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Community Issues
                </CardTitle>
                <CardDescription className="text-xs">
                  Non-emergency concerns and quality of life matters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { incident: "Cat and Dog Populations", level: "warning" },
                  { incident: "Littering", level: "warning" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-muted rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{item.incident}</p>
                      <StatusBadge
                        level={item.level as "warning" | "safe" | "critical"}
                        label={item.level.toUpperCase()}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Community Services</CardTitle>
            <CardDescription>
              Access local government services and programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={() =>
                  handleServiceAction("Connecting to LGU hotline...")
                }
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12"
                title="Contact Local Government Unit for inquiries and assistance"
              >
                <Phone className="h-4 w-4" />
                CONTACT LGU
              </Button>
              <Button
                onClick={() =>
                  handleServiceAction("Opening event registration form...")
                }
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 h-12"
                title="Register for community events like Zumba, Pageants, and Health Programs"
              >
                <Calendar className="h-4 w-4" />
                REGISTER Event
              </Button>
              <Button
                onClick={() =>
                  handleServiceAction("Opening service booking portal...")
                }
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-12"
                title="Book appointments for medical consultation, document processing, and more"
              >
                <Briefcase className="h-4 w-4" />
                BOOK Local Service
              </Button>
            </div>
            {selectedService && (
              <div className="mt-3 p-3 bg-primary/20 rounded text-sm font-semibold text-center">
                {selectedService}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
