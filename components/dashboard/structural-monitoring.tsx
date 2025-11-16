"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./StructuralMonitoringMap"), {
  ssr: false,
});

interface Building {
  id: number;
  name: string;
  type: string;
  status: "safe" | "warning" | "critical";
  lat: number;
  lng: number;
  lastInspection: string;
  warningRadius: number; // in meters
  structuralScore: number; // 0-100
  issues: string[];
}

export function StructuralMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const buildings: Building[] = [
    {
      id: 1,
      name: "Pasay City Hall",
      type: "Government Building",
      status: "safe",
      lat: 14.5378,
      lng: 121.0014,
      lastInspection: "2 hours ago",
      warningRadius: 0,
      structuralScore: 95,
      issues: [],
    },
    {
      id: 2,
      name: "SM Mall of Asia Arena",
      type: "Commercial Complex",
      status: "warning",
      lat: 14.5352,
      lng: 120.9823,
      lastInspection: "1 day ago",
      warningRadius: 50,
      structuralScore: 68,
      issues: [
        "Minor cracks detected in support columns",
        "Requires follow-up inspection",
      ],
    },
    {
      id: 3,
      name: "Cuneta Astrodome",
      type: "Sports Facility",
      status: "safe",
      lat: 14.5489,
      lng: 121.0012,
      lastInspection: "3 hours ago",
      warningRadius: 0,
      structuralScore: 88,
      issues: [],
    },
    {
      id: 4,
      name: "Pasay General Hospital",
      type: "Healthcare Facility",
      status: "critical",
      lat: 14.5456,
      lng: 121.0089,
      lastInspection: "30 minutes ago",
      warningRadius: 100,
      structuralScore: 42,
      issues: [
        "Significant structural damage detected",
        "Foundation instability",
        "Immediate evacuation recommended",
      ],
    },
    {
      id: 5,
      name: "Villamor Air Base Housing",
      type: "Residential Complex",
      status: "safe",
      lat: 14.5089,
      lng: 121.0192,
      lastInspection: "5 hours ago",
      warningRadius: 0,
      structuralScore: 92,
      issues: [],
    },
    {
      id: 6,
      name: "Newport World Resorts",
      type: "Entertainment Complex",
      status: "warning",
      lat: 14.5203,
      lng: 121.0198,
      lastInspection: "4 hours ago",
      warningRadius: 75,
      structuralScore: 71,
      issues: ["Elevated vibration readings", "Monitoring required"],
    },
    {
      id: 7,
      name: "Baclaran Church",
      type: "Religious Structure",
      status: "safe",
      lat: 14.5234,
      lng: 120.9934,
      lastInspection: "6 hours ago",
      warningRadius: 0,
      structuralScore: 85,
      issues: [],
    },
  ];

  const safeCount = buildings.filter((b) => b.status === "safe").length;
  const warningCount = buildings.filter((b) => b.status === "warning").length;
  const criticalCount = buildings.filter((b) => b.status === "critical").length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Structural Health Monitoring
            </h1>
          </div>
          <p className="text-muted-foreground">
            Real-time monitoring of building structural integrity across Pasay
            City
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

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Buildings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{buildings.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-500 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Safe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{safeCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-yellow-500 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">
                {warningCount}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-500/10 border-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-500 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Critical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Map and Building List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Map */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Building Locations & Safety Zones
              </CardTitle>
              <CardDescription>
                Warning radius shown for buildings with structural concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden">
                <DynamicMap
                  buildings={buildings}
                  onBuildingSelect={setSelectedBuilding}
                />
              </div>
            </CardContent>
          </Card>

          {/* Building List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-secondary" />
                Monitored Structures
              </CardTitle>
              <CardDescription>Click to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {buildings.map((building) => (
                <div
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedBuilding?.id === building.id
                      ? "border-secondary bg-secondary/10"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{building.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {building.type}
                      </p>
                    </div>
                    <StatusBadge
                      level={building.status as "safe" | "warning" | "critical"}
                      label={building.status.toUpperCase()}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Score: {building.structuralScore}/100
                    </span>
                    <span className="text-muted-foreground">
                      {building.lastInspection}
                    </span>
                  </div>
                  {building.warningRadius > 0 && (
                    <div className="mt-2 text-xs text-yellow-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {building.warningRadius}m warning radius
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Selected Building Details */}
        {selectedBuilding && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-secondary" />
                Building Details: {selectedBuilding.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Building Type
                  </p>
                  <p className="text-lg font-semibold">
                    {selectedBuilding.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Structural Score
                  </p>
                  <p className="text-lg font-semibold">
                    {selectedBuilding.structuralScore}/100
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Last Inspection
                  </p>
                  <p className="text-lg font-semibold">
                    {selectedBuilding.lastInspection}
                  </p>
                </div>
              </div>

              {selectedBuilding.warningRadius > 0 && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <p className="font-semibold text-yellow-500">
                      Safety Warning
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Citizens are advised to avoid entering within{" "}
                    {selectedBuilding.warningRadius} meters of this building
                    until further notice.
                  </p>
                </div>
              )}

              {selectedBuilding.issues.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Identified Issues:
                  </p>
                  <ul className="space-y-1">
                    {selectedBuilding.issues.map((issue, index) => (
                      <li
                        key={index}
                        className="text-sm flex items-start gap-2"
                      >
                        <span className="text-destructive">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedBuilding.status === "safe" && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <p className="font-semibold text-green-500">
                      Building is structurally safe for occupancy
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
