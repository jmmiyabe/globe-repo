"use client";

import { AlertCircle, MapPin, Phone, Shield, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SarReport {
  id: string;
  location: string;
  type: "rescue" | "evacuation" | "missing_person";
  status: "active" | "resolved" | "pending";
  priority: "critical" | "high" | "medium" | "low";
  reportedAt: string;
  personnel: number;
  contact: string;
}

interface CrimeWarning {
  id: string;
  area: string;
  type: string;
  severity: "critical" | "high" | "medium";
  description: string;
  reportedAt: string;
  status: "active" | "resolved";
}

const sarReports: SarReport[] = [
  {
    id: "SAR-001",
    location: "North District - Highway 5",
    type: "rescue",
    status: "active",
    priority: "critical",
    reportedAt: "15 min ago",
    personnel: 12,
    contact: "+63 9XX-XXXX-001",
  },
  {
    id: "SAR-002",
    location: "Central District - River Area",
    type: "evacuation",
    status: "active",
    priority: "high",
    reportedAt: "32 min ago",
    personnel: 8,
    contact: "+63 9XX-XXXX-002",
  },
  {
    id: "SAR-003",
    location: "East District",
    type: "missing_person",
    status: "pending",
    priority: "high",
    reportedAt: "1 hr ago",
    personnel: 5,
    contact: "+63 9XX-XXXX-003",
  },
];

const crimeWarnings: CrimeWarning[] = [
  {
    id: "CRIME-001",
    area: "Downtown Business District",
    type: "Looting reported",
    severity: "high",
    description:
      "Reported looting at commercial establishments during evacuation",
    reportedAt: "45 min ago",
    status: "active",
  },
  {
    id: "CRIME-002",
    area: "Harbor Zone",
    type: "Unauthorized entry",
    severity: "medium",
    description: "Suspicious activity at port facilities",
    reportedAt: "2 hrs ago",
    status: "active",
  },
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-500/20 text-red-400";
    case "high":
      return "bg-orange-500/20 text-orange-400";
    case "medium":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

export function LguSarSecurityDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            SAR & Security Operations Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time search and rescue reports and crime warnings
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active SAR Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Personnel Deployed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">25</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all operations
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Crime Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ongoing investigations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SAR Reports */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle>Search and Rescue Reports</CardTitle>
            <CardDescription>Active and pending SAR operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sarReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 rounded-lg border ${getPriorityColor(
                    report.priority
                  )}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {report.id}
                        </h3>
                        <Badge
                          className={`${
                            report.status === "active"
                              ? "bg-green-600 text-white"
                              : report.status === "pending"
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-500/30 text-gray-300"
                          }`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/10"
                    >
                      <Phone className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs opacity-70">Type</p>
                      <p className="font-semibold capitalize">
                        {report.type.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70">Reported</p>
                      <p className="font-semibold">{report.reportedAt}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <div>
                        <p className="text-xs opacity-70">Personnel</p>
                        <p className="font-semibold">{report.personnel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crime Warnings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Crime & Security Warnings</CardTitle>
            <CardDescription>
              Active incidents requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crimeWarnings.map((warning) => (
                <div
                  key={warning.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(
                    warning.severity
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {warning.type}
                        </h3>
                        <Badge
                          className={`${
                            warning.status === "active"
                              ? "bg-green-600 text-white"
                              : "bg-gray-500/30 text-gray-300"
                          }`}
                        >
                          {warning.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {warning.description}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 opacity-70" />
                          {warning.area}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 opacity-70" />
                          {warning.reportedAt}
                        </div>
                      </div>
                    </div>
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
