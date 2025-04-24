"use client";

import { useHydrateAtoms } from "jotai/utils";

import {  userAtom } from "@/atoms/user-atom";
import { IUser } from "@/types/user";

interface UserProfileProviderProps {
  userProfile: IUser;
  children: React.ReactNode;
}

export function UserProfileProvider({
  userProfile,
  children,
}: Readonly<UserProfileProviderProps>) {
  useHydrateAtoms([[userAtom, userProfile]]);
  return <>{children}</>;
}
