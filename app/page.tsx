"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";

export default function Home() {
  // const router = useRouter();

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
