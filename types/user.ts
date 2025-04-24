export interface IUser {
  displayName: string;
  email: string;
  profilePicture: string | null;
  role: "admin" | "mod" | "regular";
  userId: string;
}
