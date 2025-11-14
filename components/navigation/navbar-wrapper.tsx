"use client"

import { usePathname } from "next/navigation"
import { DashboardNav } from "./dashboard-nav"

export default function NavbarWrapper() {
  const pathname = usePathname()
  if (pathname === "/login") return null
  return <DashboardNav />
}
