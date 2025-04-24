import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
