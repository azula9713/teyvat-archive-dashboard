import { atom, useAtom } from "jotai";
import { IUser } from "@/types/user";
import { useHydrateAtoms } from "jotai/utils";

export const userAtom = atom<IUser | null>(null);

export const setUserAtom = ({ userFromServer }: { userFromServer: IUser }) => {
  useHydrateAtoms([[userAtom, userFromServer]]);
};
