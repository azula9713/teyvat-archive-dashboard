"use client"

import type React from "react"
// Adapted from: https://ui.shadcn.com/docs/components/toast
import { useState, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description, variant, action }: Omit<ToastProps, "id">) => {
    setToasts((toasts) => {
      const id = genId()

      // Remove toast after delay
      setTimeout(() => {
        setToasts((toasts) => toasts.filter((t) => t.id !== id))
      }, TOAST_REMOVE_DELAY)

      const newToasts = [{ id, title, description, variant, action }, ...toasts].slice(0, TOAST_LIMIT)

      return newToasts
    })
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
}
