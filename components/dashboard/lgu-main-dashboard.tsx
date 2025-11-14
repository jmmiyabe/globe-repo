"use client";

import type React from "react";

import {
  AlertTriangle,
  Cloud,
  Shield,
  Radio,
  AlertCircle,
  Users,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UrgentAlert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  action?: string;
}

interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: "critical" | "warning" | "safe" | "neutral";
}

const urgentAlerts: UrgentAlert[] = [
  {
    id: "ALERT-001",
    type: "critical",
    title: "North District: Heavy Flooding",
    description:
      "Water levels rising rapidly. 342 evacuees sheltered. 15 SAR operations active.",
    timestamp: "2 min ago",
    action: "View Details",
  },
  {
    id: "ALERT-002",
    type: "warning",
    title: "Central District: Shelter Capacity",
    description:
      "Central School Gymnasium at 68% capacity. Secondary shelter ready for activation.",
    timestamp: "8 min ago",
    action: "Activate Secondary",
  },
  {
    id: "ALERT-003",
    type: "warning",
    title: "West District: Crime Alert",
    description:
      "Increased suspicious activity reported. 2 additional patrols deployed.",
    timestamp: "15 min ago",
    action: "Review Report",
  },
];

const responseMetrics = [
  { time: "00:00", critical: 5, warning: 8, safe: 12 },
  { time: "04:00", critical: 4, warning: 10, safe: 14 },
  { time: "08:00", critical: 3, warning: 7, safe: 16 },
  { time: "12:00", critical: 2, warning: 5, safe: 18 },
  { time: "16:00", critical: 1, warning: 4, safe: 19 },
];

const keyMetrics: MetricData[] = [
  {
    label: "Critical Alerts",
    value: "2",
    change: -1,
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "critical",
  },
  {
    label: "Active Incidents",
    value: "12",
    change: -3,
    icon: <Radio className="h-5 w-5" />,
    color: "warning",
  },
  {
    label: "Evacuees Sheltered",
    value: "2,298",
    change: 156,
    icon: <Users className="h-5 w-5" />,
    color: "neutral",
  },
  {
    label: "Shelter Capacity",
    value: "92%",
    change: 5,
    icon: <MapPin className="h-5 w-5" />,
    color: "warning",
  },
];

function getAlertColor(type: string) {
  switch (type) {
    case "critical":
      return "border-red-500/30 bg-red-500/10";
    case "warning":
      return "border-yellow-500/30 bg-yellow-500/10";
    case "info":
      return "border-blue-500/30 bg-blue-500/10";
    default:
      return "border-border";
  }
}

function getMetricColor(color: string) {
  switch (color) {
    case "critical":
      return "bg-red-500/10 border-red-500/20";
    case "warning":
      return "bg-yellow-500/10 border-yellow-500/20";
    case "safe":
      return "bg-green-500/10 border-green-500/20";
    default:
      return "bg-primary/10 border-primary/20";
  }
}

function getMetricTextColor(color: string) {
  switch (color) {
    case "critical":
      return "text-red-400";
    case "warning":
      return "text-yellow-400";
    case "safe":
      return "text-green-400";
    default:
      return "text-primary";
  }
}

export function LguMainDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            LGU Command Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time emergency response insights and urgent data
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

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {keyMetrics.map((metric, idx) => (
            <Card
              key={idx}
              className={`border ${getMetricColor(metric.color)}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                  <div className={getMetricTextColor(metric.color)}>
                    {metric.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-3xl font-bold ${getMetricTextColor(
                    metric.color
                  )}`}
                >
                  {metric.value}
                </div>
                {metric.change !== undefined && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span
                      className={
                        metric.change < 0 ? "text-green-400" : "text-yellow-400"
                      }
                    >
                      {metric.change < 0 ? "↓" : "↑"} {Math.abs(metric.change)}
                    </span>{" "}
                    from last hour
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Urgent Alerts Section */}
        <Card className="border-border mb-8">
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
              <Badge className="bg-red-500/20 text-red-400">
                {urgentAlerts.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border flex items-start justify-between gap-4 ${getAlertColor(
                    alert.type
                  )}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {alert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 opacity-70">
                      {alert.timestamp}
                    </p>
                  </div>
                  {alert.action && (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                      onClick={() =>
                        console.log(`[v0] Action: ${alert.action}`)
                      }
                    >
                      {alert.action}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert Timeline */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Alert Status Trend</CardTitle>
              <CardDescription>
                Historical alert levels over the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={responseMetrics}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: `1px solid var(--color-border)`,
                      color: "var(--color-foreground)",
                    }}
                  />
                  <Bar
                    dataKey="critical"
                    stackId="a"
                    fill="var(--color-status-critical)"
                    name="Critical"
                  />
                  <Bar
                    dataKey="warning"
                    stackId="a"
                    fill="var(--color-status-warning)"
                    name="Warning"
                  />
                  <Bar
                    dataKey="safe"
                    stackId="a"
                    fill="var(--color-status-safe)"
                    name="Safe"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Stats */}
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
        </div>

        {/* Quick Navigation */}
        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Jump to specific dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 bg-transparent"
              >
                <Cloud className="h-6 w-6 text-primary" />
                <span>Weather Monitoring</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 bg-transparent"
              >
                <Shield className="h-6 w-6 text-primary" />
                <span>SAR & Security</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col gap-2 bg-transparent"
              >
                <Radio className="h-6 w-6 text-primary" />
                <span>Operations Center</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
