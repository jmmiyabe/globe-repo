"use client"
import type { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  showSidebar?: boolean
}

export function AppLayout({ children, sidebar, showSidebar = false }: AppLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      {showSidebar && sidebar && (
        <aside className="hidden lg:block w-64 border-r border-border bg-sidebar">{sidebar}</aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="w-full">{children}</div>
      </main>
    </div>
  )
}
