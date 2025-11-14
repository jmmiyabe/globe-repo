"use client"
import { useState, useEffect } from "react"

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "guest">("guest")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        if (data?.role === "admin") setRole("admin")
        else setRole("guest")
      })
      .finally(() => setIsLoaded(true))
  }, [])

  return {
    role,
    isAdmin: role === "admin",
    isGuest: role === "guest",
    isLoaded, 
  }
}
