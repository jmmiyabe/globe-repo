"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Siren,
  Menu,
  X,
  Cloud,
  Shield,
  Radio,
  Calendar,
  AlertCircle,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  category?: string
}

export function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: "LGU Dashboard", href: "/lgu", icon: <LayoutDashboard className="h-4 w-4" />, category: "LGU" },
    { label: "Emergency Response", href: "/", icon: <AlertTriangle className="h-4 w-4" />, category: "LGU" },
    { label: "Community Hub", href: "/citizen-hub", icon: <Siren className="h-4 w-4" />, category: "Citizen" },
    {
      label: "Services & Events",
      href: "/citizen/services-events",
      icon: <Calendar className="h-4 w-4" />,
      category: "Citizen",
    },
    {
      label: "Emergency Prep",
      href: "/citizen/emergency-prep",
      icon: <AlertCircle className="h-4 w-4" />,
      category: "Citizen",
    },
    { label: "LGU Weather", href: "/lgu/weather", icon: <Cloud className="h-4 w-4" />, category: "LGU" },
    { label: "LGU SAR & Security", href: "/lgu/sar-security", icon: <Shield className="h-4 w-4" />, category: "LGU" },
    { label: "LGU Operations", href: "/lgu/operations", icon: <Radio className="h-4 w-4" />, category: "LGU" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-sidebar-foreground">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-sidebar-primary-foreground">WCC</span>
            </div>
            <span>Weather Command</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground whitespace-nowrap"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="md:hidden text-sidebar-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 max-h-96 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
