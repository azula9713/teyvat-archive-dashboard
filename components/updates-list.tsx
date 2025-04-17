"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { sampleUpdates } from "@/data/sample-updates"
import type { Update } from "@/types/update"

interface UpdatesListProps {
  limit?: number
}

export function UpdatesList({ limit }: UpdatesListProps) {
  const [updates, setUpdates] = useState<Update[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const sortedUpdates = [...sampleUpdates].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setUpdates(limit ? sortedUpdates.slice(0, limit) : sortedUpdates)
  }, [limit])

  if (updates.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No updates found.</p>
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className="border-b pb-4 last:border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{update.description}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>By {update.author}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(update.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
            {update.version && (
              <Badge variant="outline" className="ml-2">
                v{update.version}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
