import type React from "react"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`px-4 md:px-6 py-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  )
}
