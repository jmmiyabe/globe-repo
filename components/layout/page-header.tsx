import type React from "react"

interface PageHeaderProps {
  icon?: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ icon, title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-accent">{icon}</div>}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{title}</h1>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  )
}
