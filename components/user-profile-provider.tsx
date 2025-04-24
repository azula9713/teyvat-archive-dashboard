"use client";

import { setUserAtom } from "@/atoms/user-atom";
import { IUser } from "@/types/user";

interface UserProfileProviderProps {
  userProfile: IUser;
  children: React.ReactNode;
}

export function UserProfileProvider({
  userProfile,
  children,
}: Readonly<UserProfileProviderProps>) {
  setUserAtom({ userFromServer: userProfile });
  return <>{children}</>;
}
