"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
// NOTE: I've kept the original L and Leaflet imports as they seem to work fine.
const L = typeof window !== 'undefined' ? require('leaflet') : null; 
import {
  AlertTriangle,
  Cloud,
  Shield,
  Radio,
  AlertCircle,
  Users,
  MapPin,
  RefreshCw,
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
import { useMap } from "react-leaflet"; 

// --- DYNAMIC IMPORTS FOR LEAFLET (Kept as is) ---
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

// --- RECHARTS DATA ---
const alertTrendData = [
    { hour: '12AM', critical: 1, warning: 3, total: 4 },
    { hour: '3AM', critical: 2, warning: 4, total: 6 },
    { hour: '6AM', critical: 4, warning: 6, total: 10 },
    { hour: '9AM', critical: 3, warning: 8, total: 11 },
    { hour: '12PM', critical: 2, warning: 10, total: 12 },
    { hour: '3PM', critical: 1, warning: 9, total: 10 },
    { hour: '6PM', critical: 2, warning: 8, total: 10 },
    { hour: '9PM', critical: 3, warning: 7, total: 10 },
];

// --- STEP 1: INNER CHART COMPONENT DEFINITION ---
// This component performs the Recharts imports safely using require()
// within a function that is only executed on the client.
const AlertTrendChartInner = () => {
    // Safely use require() to load Recharts named exports on the client
    // Since this component is only loaded via dynamic({ ssr: false }), this is safe.
    const Recharts = require('recharts');
    const { 
        ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
        CartesianGrid, Tooltip, Legend 
    } = Recharts;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-3 bg-slate-800/90 backdrop-blur rounded-lg border border-slate-700 shadow-lg text-xs text-white">
                    <p className="font-bold mb-1">{`Time: ${label}`}</p>
                    {payload.map((p: any, index: number) => (
                        <p key={index} style={{ color: p.color }}>
                            {`${p.name}: ${p.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={alertTrendData}
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }} 
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                        dataKey="hour" 
                        stroke="#9ca3af" 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#9ca3af" 
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ padding: "10px" }} />
                    
                    <Line 
                        type="monotone" 
                        dataKey="critical" 
                        name="Critical Alerts"
                        stroke="#ef4444" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                    />
                    
                    <Line 
                        type="monotone" 
                        dataKey="warning" 
                        name="Warning Alerts"
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// --- STEP 2: DYNAMIC IMPORT (Replacing ChartComponents) ---
const AlertTrendChartDynamic = dynamic(() => Promise.resolve(AlertTrendChartInner), {
    ssr: false,
    loading: () => <div className="h-72 w-full flex items-center justify-center text-sm text-muted-foreground">Loading chart...</div>
});

// --- CHART RENDERING FUNCTION (Now simplified) ---
function AlertTrendChart() {
    return <AlertTrendChartDynamic />;
}
// ... (rest of the file remains the same)
// ... (interfaces, metrics, and other components)

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

interface MapMarker {
  id: string;
  type: "critical" | "warning" | "shelter" | "resource";
  title: string;
  desc: string;
  position: [number, number]; 
}

const urgentAlerts: UrgentAlert[] = [
  {
    id: "ALERT-001",
    type: "critical",
    title: "North District: Heavy Flooding",
    description: "Water levels rising rapidly. 342 evacuees sheltered. 15 SAR operations active.",
    timestamp: "2 min ago",
    action: "View Details",
  },
  {
    id: "ALERT-002",
    type: "warning",
    title: "Central District: Shelter Capacity",
    description: "Central School Gymnasium at 68% capacity. Secondary shelter ready for activation.",
    timestamp: "8 min ago",
    action: "Activate Secondary",
  },
  {
    id: "ALERT-003",
    type: "warning",
    title: "West District: Crime Alert",
    description: "Increased suspicious activity reported. 2 additional patrols deployed.",
    timestamp: "15 min ago",
    action: "Review Report",
  },
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

const MARKERS: MapMarker[] = [
  {
    id: "critical-flood",
    type: "critical",
    title: "Heavy Flooding",
    desc: "342 evacuees",
    position: [14.534963, 120.99904],
  },
  {
    id: "shelter-warning",
    type: "warning",
    title: "Central Gymnasium",
    desc: "Shelter at 68%",
    position: [14.534187, 121.008983],
  },
  {
    id: "security-warning",
    type: "warning",
    title: "Security Alert",
    desc: "2 patrols active",
    position: [14.550265, 120.995091],
  },
  {
    id: "main-shelter",
    type: "shelter",
    title: "Main Shelter",
    desc: "1,200 capacity",
    position: [14.542438, 121.002989],
  },
  {
    id: "command-post",
    type: "resource",
    title: "Command Post",
    desc: "Operations Center",
    position: [14.52777, 121.007079],
  },
];


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

function makeDivIcon(L: any, kind: string, markerType: MapMarker['type'], size = 40) {
  
  const iconBase = `
    <div class="marker-wrapper" style="width: ${size}px; height: ${size}px;">
      <div class="marker-badge ${kind}-bg"></div>
      <div class="marker-center ${kind}-center">
        ${
          markerType === 'critical' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` : 
          markerType === 'warning' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` : 
          markerType === 'shelter' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` : 
          markerType === 'resource' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` : 
          `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`
        }
      </div>
    </div>
  `;
  
  return L.divIcon({
    html: iconBase,
    className: "", 
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

const geoStyle = (feature: any) => {
  return {
    color: "#60a5fa",
    weight: 1.2,
    fillOpacity: 0.06,
  };
};

function FitBounds({ data }: { data: any }) {
  const map = useMap(); 

  useEffect(() => {
    if (!data || !L) return;
    try {
      const geo = L.geoJSON(data);
      const bounds = geo.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] }); 
      }
    } catch (e) {
      console.error("Error fitting map bounds:", e);
    }
  }, [data, map]);

  return null;
}

function MapResetAction({ geoJsonData, resetTrigger }: { geoJsonData: any, resetTrigger: number }) {
    const map = useMap();

    useEffect(() => {
        if (resetTrigger === 0) return; 

        if (!geoJsonData || !L) return;
        try {
            const geo = L.geoJSON(geoJsonData);
            const bounds = geo.getBounds();
            if (bounds.isValid()) {
                map.flyToBounds(bounds, { padding: [50, 50] });
            }
        } catch (e) {
            console.error("Error resetting map bounds:", e);
        }
    }, [resetTrigger, geoJsonData, map]);

    return null; 
}


interface MapWrapperProps {
  geoJsonData: any;
  center: [number, number];
  geoStyle: (feature: any) => any;
  MARKERS: MapMarker[];
  loadingGeo: boolean;
  errorGeo: string | null;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

function MapWrapper({ geoJsonData, center, geoStyle, MARKERS, loadingGeo, errorGeo, selectedTab, setSelectedTab }: MapWrapperProps) {
  
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0); 

  if (!L) {
    return <div>Leaflet library not loaded.</div>;
  }
  
  const handleResetClick = () => {
      setResetTrigger(prev => prev + 1);
  };
  
  const onEachFeature = (feature: any, layer: any) => {
    
    const name = feature.properties.NAME_1 || feature.properties.NAME || feature.properties.BRGY_NAME || 'Unknown Area';

    layer.on({
      click: (e: any) => {
        const map = e.target._map; 
        if (map) {
          map.flyToBounds(e.target.getBounds(), { padding: [20, 20] });
        }
      },
      mouseover: (e: any) => {
        const targetLayer = e.target;
        targetLayer.setStyle({
          weight: 3, 
          color: '#3b82f6', 
          fillOpacity: 0.2, 
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          targetLayer.bringToFront();
        }
        setHoveredFeature(name);
      },
      mouseout: (e: any) => {
        e.target.setStyle(geoStyle(feature));
        setHoveredFeature(null);
      }
    });
  };

  return (
    <Card className="border-border lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Real-Time Situational Map
        </CardTitle>
        <CardDescription>Geographic overview of incidents, alerts, and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => setSelectedTab('zone')}
            className={`px-3 py-1 rounded ${selectedTab === 'zone' ? 'bg-primary text-white' : 'bg-muted'}`}>
            Zone View
          </button>
          <button
            onClick={() => setSelectedTab('barangay')}
            className={`px-3 py-1 rounded ${selectedTab === 'barangay' ? 'bg-primary text-white' : 'bg-muted'}`}>
            Barangay View
          </button>
          <button
            onClick={() => setSelectedTab('city')}
            className={`px-3 py-1 rounded ${selectedTab === 'city' ? 'bg-primary text-white' : 'bg-muted'}`}>
            City View
          </button>
          <div className="ml-auto text-sm text-muted-foreground">{loadingGeo ? 'Loading geojson...' : errorGeo ? `Error: ${errorGeo}` : 'GeoJSON loaded'}</div>
        </div>

        <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border" style={{ zIndex: 0 }}>

          <MapContainer 
            center={center} 
            zoom={13} 
            style={{ width: '100%', height: '100%' }}
            className="z-1" 
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {geoJsonData && (
              <>
                <GeoJSON 
                  data={geoJsonData} 
                  style={geoStyle} 
                  onEachFeature={onEachFeature} 
                />
                <FitBounds data={geoJsonData} />
                <MapResetAction geoJsonData={geoJsonData} resetTrigger={resetTrigger} /> 
              </>
            )}

            {MARKERS.map((m) => {
              const kind = m.type === 'critical' ? 'red' : m.type === 'warning' ? 'yellow' : m.type === 'shelter' ? 'blue' : 'green';
              const icon = makeDivIcon(L, kind, m.type, 40); 
              return (
                <Marker key={m.id} position={m.position} icon={icon}>
                  <Popup>
                    <div className="text-sm">
                      <strong>{m.title}</strong>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          <div className="absolute top-4 right-4 flex gap-2 z-[1001]">
            <div className="bg-slate-800/90 backdrop-blur px-3 py-1 rounded-lg border border-slate-700 text-xs text-slate-300">
                Viewing: <span className="font-bold">{hoveredFeature || (selectedTab === 'zone' ? 'All Zones' : selectedTab === 'barangay' ? 'All Barangays' : 'City Wide')}</span>
            </div>
            <Button 
                onClick={handleResetClick} 
                size="sm" 
                variant="secondary"
                className="h-7 px-2 py-0 text-xs bg-slate-700 hover:bg-slate-600/90 text-white"
            >
                <RefreshCw className="h-3 w-3 mr-1" /> Reset View
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur px-4 py-3 rounded-lg border border-slate-700" style={{ zIndex: 1000 }}>
            <p className="text-xs font-semibold text-slate-300 mb-2">Legend</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-white" />
                <span className="text-xs text-slate-300">Critical Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white" />
                <span className="text-xs text-slate-300">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full border border-white" />
                <span className="text-xs text-slate-300">Shelter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full border border-white" />
                <span className="text-xs text-slate-300">Resources</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export default function LguMainDashboard() {
  const [selectedTab, setSelectedTab] = useState("zone");
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [errorGeo, setErrorGeo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const center: [number, number] = [14.538, 121.001];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const geoUrl = useMemo(() => {
    switch (selectedTab) {
      case "zone":
        return "/PASAY.geojson"; 
      case "barangay":
        return "/PASAYB.geojson"; 
      case "city":
        return "/PASAYC.geojson"; 
      default:
        return "/PASAY.geojson";
    }
  }, [selectedTab]);

  useEffect(() => {
    let mounted = true;
    if (!isClient) return; 
    
    setLoadingGeo(true);
    setErrorGeo(null);
    setGeoJsonData(null);

    fetch(geoUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!mounted) return;
        setGeoJsonData(json);
      })
      .catch((err) => {
        if (!mounted) return;
        setErrorGeo(err.message || "Failed to load geojson");
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingGeo(false);
      });

    return () => {
      mounted = false;
    };
  }, [geoUrl, isClient]);


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            LGU Command Center
          </h1>
          <p className="text-muted-foreground mt-2">Real-time emergency response insights and urgent data</p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{' '}
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

          <div className="lg:col-span-1 space-y-2">
            {keyMetrics.map((metric, idx) => (
              <Card key={idx} className={`border ${getMetricColor(metric.color)}`}>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                    <div className={getMetricTextColor(metric.color)}>{metric.icon}</div>
                  </div>
                  <div className={`text-2xl font-bold ${getMetricTextColor(metric.color)}`}>{metric.value}</div>
                  {metric.change !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className={metric.change < 0 ? 'text-green-400' : 'text-yellow-400'}>
                        {metric.change < 0 ? '↓' : '↑'} {Math.abs(metric.change)}
                      </span>{' '}
                      from last hour
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {isClient ? (
            <MapWrapper 
              geoJsonData={geoJsonData} 
              center={center} 
              geoStyle={geoStyle} 
              MARKERS={MARKERS}
              loadingGeo={loadingGeo}
              errorGeo={errorGeo}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ) : (
            <Card className="border-border lg:col-span-2">
              <div className="w-full h-[500px] flex items-center justify-center text-muted-foreground">
                Loading Map...
              </div>
            </Card>
          )}

        </div>

        <Card className="border-border mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  Urgent Alerts
                </CardTitle>
                <CardDescription>Critical situations requiring immediate attention</CardDescription>
              </div>
              <Badge className="bg-red-500/20 text-red-400">{urgentAlerts.length} Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border flex items-start justify-between gap-4 ${alert.type === 'critical' ? 'border-red-500/30 bg-red-500/10' : alert.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-blue-500/30 bg-blue-500/10'}`}>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-2 opacity-70">{alert.timestamp}</p>
                  </div>
                  {alert.action && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90 whitespace-nowrap" onClick={() => console.log(`[v0] Action: ${alert.action}`)}>{alert.action}</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Alert Status Trend</CardTitle>
              <CardDescription>Historical critical and warning alerts over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertTrendChart /> {/* Renders the dynamically loaded AlertTrendChartDynamic */}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Response Status</CardTitle>
              <CardDescription>Current operational metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Weather Resilience</span>
                    <span className="text-sm text-primary font-semibold">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Resource Availability</span>
                    <span className="text-sm text-green-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Response Time</span>
                    <span className="text-sm text-yellow-400 font-semibold">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">View Full Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Jump to specific dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent"><Cloud className="h-6 w-6 text-primary" /><span>Weather Monitoring</span></Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent"><Shield className="h-6 w-6 text-primary" /><span>SAR & Security</span></Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent"><Radio className="h-6 w-6 text-primary" /><span>Operations Center</span></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        .marker-wrapper { position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
        .marker-badge { 
          position: absolute; 
          width: 40px; 
          height: 40px; 
          border-radius: 9999px; 
          opacity: 0.45; 
          animation: pulse 1.8s infinite; 
        }
        .marker-center { 
          position: absolute; 
          width: 28px; 
          height: 28px; 
          border-radius: 9999px; 
          border: 3px solid white; 
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .red-bg { background: rgba(239, 68, 68, 0.4); }
        .red-center { background: rgb(239,68,68); }
        .yellow-bg { background: rgba(234, 179, 8, 0.4); }
        .yellow-center { background: rgb(234,179,8); }
        .blue-bg { background: rgba(59,130,246,0.4); }
        .blue-center { background: rgb(59,130,246); }
        .green-bg { background: rgba(34,197,94,0.4); }
        .green-center { background: rgb(34,197,94); }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 0.2; } 
          100% { transform: scale(0.9); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}