import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import useUser from "@/hooks/use-user";
import { UserProfileProvider } from "@/components/user-profile-provider";

export default async function DashboardHome() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  const { getUserProfile } = useUser({ userToken: session.access_token });

  const userProfile = await getUserProfile();

  return (
    <UserProfileProvider userProfile={userProfile}>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </UserProfileProvider>
  );
}
