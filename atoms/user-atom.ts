import { atom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { IUser } from "@/types/user";

export const userAtom = atom<IUser | null>(null);
