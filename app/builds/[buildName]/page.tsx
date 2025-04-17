"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { BuildForm } from "@/components/character-build/build-form";
import { isAuthenticated } from "@/lib/auth";
import type { ICharacterBuildInput } from "@/types/build";
import { sampleBuilds } from "@/data/sample-builds";

export default function EditBuildPage({
  params,
}: {
  params: { buildName: string };
}) {
  const [build, setBuild] = useState<ICharacterBuildInput | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const decodedBuildName = decodeURIComponent(params.buildName);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

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
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg">Loading build...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!build) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Build Not Found</h1>
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
      <h1 className="text-3xl font-bold mb-6">Edit Build: {build.buildName}</h1>
      <BuildForm initialData={build} isEditing />
    </DashboardLayout>
  );
}
