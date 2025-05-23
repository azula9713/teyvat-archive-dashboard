"use client";

import { BarChart3, FileText, Users } from "lucide-react";
import Link from "next/link";

import { RecentUpdates } from "@/components/recent-updates";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDashboardData from "@/hooks/use-dashboard-data";

export function DashboardContent() {
  const { totalBuilds, builds, buildsLoading, buildsError } =
    useDashboardData();

  if (buildsLoading) {
    return <div>Loading...</div>;
  }

  if (buildsError) {
    return <div>Error: {buildsError.message}</div>;
  }
  console.log(builds);
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to Teyvat Archive Admin dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/builds/new">
            <Button>Create New Build</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="updates">Recent Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Builds
                </CardTitle>
                <FileText className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBuilds}</div>
                <p className="text-muted-foreground text-xs">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Characters Used
                </CardTitle>
                <Users className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">characters ised</div>
                <p className="text-muted-foreground text-xs">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Updates
                </CardTitle>
                <BarChart3 className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-muted-foreground text-xs">
                  +3 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Builds</CardTitle>
                <CardDescription>
                  The most recently created or updated builds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {builds.slice(0, 5).map((build) => (
                    <div
                      key={build.buildName}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{build.buildName}</p>
                        <p className="text-muted-foreground text-sm">
                          {build.characterId}
                        </p>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {build.lastUpdatedPatch}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href="/builds">
                    <Button variant="outline" size="sm">
                      View All Builds
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Popular Characters</CardTitle>
                <CardDescription>
                  Characters with the most builds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-2">
                  {Array.from(
                    sampleBuilds.reduce((acc, build) => {
                      acc.set(
                        build.characterId,
                        (acc.get(build.characterId) || 0) + 1
                      );
                      return acc;
                    }, new Map())
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([character, count]) => (
                      <div
                        key={character}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <p className="font-medium">{character}</p>
                        <p className="text-muted-foreground text-sm">
                          {count} builds
                        </p>
                      </div>
                    ))}
                </div> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="updates" className="space-y-4">
          <RecentUpdates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
