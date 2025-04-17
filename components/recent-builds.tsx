"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { sampleBuilds } from "@/data/sample-builds"
import type { ICharacterBuildInput } from "@/types/build"

export function RecentBuilds() {
  const [builds, setBuilds] = useState<ICharacterBuildInput[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const sortedBuilds = [...sampleBuilds].sort(
      (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
    )
    setBuilds(sortedBuilds.slice(0, 5))
  }, [])

  if (builds.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No builds found.</p>
  }

  return (
    <div className="space-y-4">
      {builds.map((build) => (
        <div key={build.buildName} className="border-b pb-4 last:border-0">
          <Link href={`/builds/${encodeURIComponent(build.buildName)}`} className="hover:underline">
            <p className="font-medium">{build.buildName}</p>
          </Link>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>{build.characterId}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(build.lastUpdate), { addSuffix: true })}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
