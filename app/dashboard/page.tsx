import { redirect } from "next/navigation";

import { DashboardContent } from "@/components/dashboard-content";
import { DashboardLayout } from "@/components/dashboard-layout";
import { UserProfileProvider } from "@/components/user-profile-provider";
import httpClient from "@/services/http-client";
import { createClient } from "@/utils/supabase/server";



export default async function DashboardHome() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }
  
  const getUserProfile = async () => {
    const response = await httpClient.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    return response.data;
  };


  const userProfile = await getUserProfile();

  return (
    <UserProfileProvider userProfile={userProfile}>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </UserProfileProvider>
  );
}
