import httpClient from "../http-client";

export const loginEmailPassword = async (email: string, password: string) => {
  try {
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};
