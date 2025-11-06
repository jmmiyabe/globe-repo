"use client"

import type React from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AlertDialogActionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  actionLabel: string
  cancelLabel?: string
  onConfirm: () => void
  variant?: "destructive" | "warning" | "info"
  icon?: React.ReactNode
}

export function AlertDialogComponent({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  cancelLabel = "Cancel",
  onConfirm,
  variant = "warning",
  icon,
}: AlertDialogActionProps) {
  const actionStyles = {
    destructive: "bg-status-critical hover:bg-status-critical/90",
    warning: "bg-status-warning hover:bg-status-warning/90",
    info: "bg-primary hover:bg-primary/90",
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {icon && <div className="text-2xl">{icon}</div>}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogCancel onClick={onConfirm} className={actionStyles[variant]}>
            {actionLabel}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
