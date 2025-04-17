"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BuildList } from "@/components/build-list"
import { isAuthenticated } from "@/lib/auth"

export default function BuildsPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Character Builds</h2>
          <p className="text-muted-foreground">Manage and create character builds for Genshin Impact.</p>
        </div>
        <BuildList />
      </div>
    </DashboardLayout>
  )
}
