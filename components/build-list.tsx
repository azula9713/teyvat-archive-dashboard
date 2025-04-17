"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ICharacterBuildInput } from "@/types/build"
import { sampleBuilds } from "@/data/sample-builds"

export function BuildList() {
  const [builds, setBuilds] = useState<ICharacterBuildInput[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from an API
    setBuilds(sampleBuilds)
  }, [])

  const filteredBuilds = builds.filter((build) => build.buildName.toLowerCase().includes(searchQuery.toLowerCase()))

  const deleteBuild = (buildName: string) => {
    setBuilds(builds.filter((build) => build.buildName !== buildName))
  }

  // Helper function to display artifact set info
  const getArtifactSetDisplay = (build: ICharacterBuildInput) => {
    const mainArtifact = build.artifacts[0]

    if (mainArtifact.isFullSet) {
      // For 4pc sets
      const artifactName = mainArtifact.mainArtifactSetId
      return `4pc ${artifactName}`
    } else if (mainArtifact.secondaryArtifactSetId) {
      // For 2pc + 2pc sets
      return `2pc ${mainArtifact.mainArtifactSetId} + 2pc ${mainArtifact.secondaryArtifactSetId}`
    }

    return mainArtifact.mainArtifactSetId
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Character Builds</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search builds..."
              className="w-full sm:w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/builds/new" passHref>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Build
            </Button>
          </Link>
        </div>
      </div>

      {filteredBuilds.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mt-2 text-lg font-semibold">No builds found</h3>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Get started by creating a new build"}
          </p>
          <Link href="/builds/new" passHref>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Build
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBuilds.map((build) => (
            <Card key={build.buildName}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{build.buildName}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: {build.lastUpdate}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Character:</span>
                    <span>{build.characterId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Artifacts:</span>
                    <span>{getArtifactSetDisplay(build)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Main Weapon:</span>
                    <span>{build.weapons[0]?.weaponName || "None"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/builds/${encodeURIComponent(build.buildName)}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the build "{build.buildName}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteBuild(build.buildName)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
