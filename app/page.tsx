"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/hooks/useUserRole"
import { LguMainDashboard } from "@/components/dashboard/lgu-main-dashboard"

export default function Home() {
  const { isGuest, isAdmin, isLoaded } = useUserRole()
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!isLoaded) return // wait for role check

    if (isGuest) {
      setRedirecting(true)
      router.replace("/citizen-hub")
    }
  }, [isGuest, isLoaded, router])

  // While loading role or redirecting, show nothing
  if (!isLoaded || redirecting) return null

  // Admin default view
  if (isAdmin) return <LguMainDashboard />

  return null
}
