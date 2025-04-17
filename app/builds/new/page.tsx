"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { BuildForm } from "@/components/character-build/build-form";
import { isAuthenticated } from "@/lib/auth";

export default function NewBuildPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Build</h1>
      <BuildForm />
    </DashboardLayout>
  );
}
