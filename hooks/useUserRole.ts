// /hooks/useUserRole.ts
"use client"
import { useState, useEffect } from "react"

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "guest">("guest")

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        if (data?.role === "admin") setRole("admin")
        else setRole("guest")
      })
  }, [])

  return {
    role,
    isAdmin: role === "admin",
    isGuest: role === "guest",
  }
}
