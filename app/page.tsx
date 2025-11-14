"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/hooks/useUserRole" 
import { EmergencyDashboard } from "@/components/dashboard/emergency-dashboard"

export default function Home() {
  const { isGuest } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (isGuest) {      router.replace("/citizen-hub")
    }
  }, [isGuest, router])

  if (isGuest) {
    return null 
  }

  return <EmergencyDashboard />
}