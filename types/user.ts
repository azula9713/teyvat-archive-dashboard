export interface IUser {
  profile: {
    createdAt: string;
    displayName: string;
    profilePicture: string | null;
    role: "admin" | "mod" | "regular";
    userId: string;
    email: string;
    updatedAt: string;
  };
  session: {
    accessToken: string;
    expiresAt: string;
    refreshToken: string;
    tokenType: string;
  };
}
