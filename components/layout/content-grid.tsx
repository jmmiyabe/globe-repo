import type React from "react"

interface ContentGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
}

export function ContentGrid({ children, columns = 1 }: ContentGridProps) {
  const columnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return <div className={`grid ${columnClass[columns]} gap-4`}>{children}</div>
}
