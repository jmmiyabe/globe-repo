"use client";
import dynamic from "next/dynamic";

// Dynamically import the dashboard (client-only)
const DynamicLguWeatherDashboard = dynamic(
  () => import("./lgu-weather-dashboard").then(mod => mod.LguWeatherDashboard),
  { ssr: false, loading: () => <div>Loading Weather Map...</div> }
);

export function LguWeatherDashboardWrapper() {
  return <DynamicLguWeatherDashboard />;
}
