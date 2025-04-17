"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Simple auth check function
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

// Hook to protect routes
export function useRequireAuth() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated() && !pathname.startsWith("/auth")) {
      router.push("/auth/login")
    }
  }, [router, pathname])

  return isAuthenticated()
}

// Hook to redirect authenticated users away from auth pages
export function useRedirectIfAuthenticated() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/")
    }
  }, [router])
}

// Logout function
export function logout() {
  localStorage.removeItem("isAuthenticated")
  window.location.href = "/auth/login"
}
