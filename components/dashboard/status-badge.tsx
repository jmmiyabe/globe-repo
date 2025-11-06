interface StatusBadgeProps {
  level: "critical" | "warning" | "safe"
  label: string
}

export function StatusBadge({ level, label }: StatusBadgeProps) {
  const colors = {
    critical: "bg-red-950 text-red-200 border-red-800",
    warning: "bg-yellow-950 text-yellow-200 border-yellow-800",
    safe: "bg-green-950 text-green-200 border-green-800",
  }

  const indicators = {
    critical: "bg-red-500",
    warning: "bg-yellow-500",
    safe: "bg-green-500",
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${colors[level]}`}
    >
      <div className={`w-2 h-2 rounded-full ${indicators[level]} animate-pulse`}></div>
      {label}
    </div>
  )
}
