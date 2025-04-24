"use client";

export const runtime = "edge";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BuildForm } from "@/components/character-build/build-form";
import { DashboardLayout } from "@/components/dashboard-layout";
import { sampleBuilds } from "@/data/sample-builds";
import type { ICharacterBuildInput } from "@/types/build";

export default function EditBuildPage({
  params
}: {
  params: { buildName: string };
}) {
  const [build, setBuild] = useState<ICharacterBuildInput | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const decodedBuildName = decodeURIComponent(params.buildName);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundBuild = sampleBuilds.find(
      (b) => b.buildName === decodedBuildName
    );
    setBuild(foundBuild || null);
    setLoading(false);
  }, [decodedBuildName, router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-lg">Loading build...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!build) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h1 className="mb-2 text-2xl font-bold">Build Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The build you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/builds")}
            className="text-primary hover:underline"
          >
            Return to builds
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">Edit Build: {build.buildName}</h1>
      <BuildForm initialData={build} isEditing />
    </DashboardLayout>
  );
}
