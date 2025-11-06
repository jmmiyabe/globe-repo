"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { Button } from "@/components/ui/button"

interface SidebarNavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

interface SidebarNavProps {
  items: SidebarNavItem[]
  section?: string
}

export function SidebarNav({ items, section }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4">
      {section && <h3 className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-2">{section}</h3>}
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-2 ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
                  {item.badge}
                </span>
              )}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
