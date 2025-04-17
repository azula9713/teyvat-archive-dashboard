"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard-content"
import { isAuthenticated } from "@/lib/auth"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
