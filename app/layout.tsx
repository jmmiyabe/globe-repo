import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import Script from "next/script" 

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LGU Weather Monitoring Dashboard",
  description: "Real-time area-based weather status and alerts",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* 1. Leaflet CSS: Must be in the <head> */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />
        
        {/* 2. Leaflet JS: Needs to load before Windy's script */}
        <Script 
          src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" 
          strategy="beforeInteractive" 
        />
        
      </head>
      
      <body className={`font-sans antialiased`}>
        <DashboardNav />
        {children}
        <Analytics />
        
        {/* 3. Windy Map Forecast API JS: Loads the map functionality */}
        <Script 
          src="https://api.windy.com/assets/map-forecast/libBoot.js" 
          strategy="afterInteractive" 
        />
        
      </body>
    </html>
  )
}