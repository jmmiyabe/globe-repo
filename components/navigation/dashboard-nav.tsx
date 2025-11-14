"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useUserRole } from "@/hooks/useUserRole"
import { useRouter } from "next/navigation"

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
  LogOut,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  category?: "LGU" | "Citizen"
}

export function DashboardNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAdmin, isGuest } = useUserRole()
  const router = useRouter()

  const navItems: NavItem[] = [
    { label: "LGU Dashboard", href: "/lgu", icon: <LayoutDashboard className="h-4 w-4" />, category: "LGU" },
    { label: "Emergency Response", href: "/", icon: <AlertTriangle className="h-4 w-4" />, category: "LGU" },
    { label: "Community Hub", href: "/citizen-hub", icon: <Siren className="h-4 w-4" />, category: "Citizen" },
    { label: "Services & Events", href: "/citizen/services-events", icon: <Calendar className="h-4 w-4" />, category: "Citizen" },
    { label: "Emergency Prep", href: "/citizen/emergency-prep", icon: <AlertCircle className="h-4 w-4" />, category: "Citizen" },
    { label: "LGU Weather", href: "/lgu/weather", icon: <Cloud className="h-4 w-4" />, category: "LGU" },
    { label: "LGU SAR & Security", href: "/lgu/sar-security", icon: <Shield className="h-4 w-4" />, category: "LGU" },
    { label: "LGU Operations", href: "/lgu/operations", icon: <Radio className="h-4 w-4" />, category: "LGU" },
  ]

  const filteredItems = navItems.filter(item => {
    if (isAdmin) return true
    if (isGuest) return item.category !== "LGU"
    return true
  })

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border w-full shadow-md">
      <div className="flex items-center h-16 max-w-full px-2 md:px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-lg text-sidebar-foreground">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-xs font-bold text-sidebar-primary-foreground">WCC</span>
          </div>
          <span className="hidden sm:inline">Weather Command</span>
          <span className="sm:hidden">WCC</span>
        </Link>

        {/* Centered Nav Links */}
        <div className="flex flex-1 justify-center gap-1 ml-4 overflow-x-auto">
          {filteredItems.map(item => (
            <Link key={item.href} href={item.href} className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground whitespace-nowrap"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Actions on the right */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <ThemeToggle />
          {isAdmin && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden ml-2 flex items-center">
          <button
            className="text-sidebar-foreground p-2 rounded-md hover:bg-sidebar-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden pb-4 space-y-1 border-t border-sidebar-border mt-0 px-2">
          {filteredItems.map(item => (
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
          {isAdmin && (
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 mt-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  )
}
