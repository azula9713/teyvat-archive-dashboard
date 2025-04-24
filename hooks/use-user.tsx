import httpClient from "@/services/http-client";

export default function useUser({ userToken }: { userToken: string }) {
  const getUserProfile = async () => {
    const response = await httpClient.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  };

  return { getUserProfile };
}
