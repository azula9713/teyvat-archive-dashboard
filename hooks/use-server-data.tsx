import useSWR from "swr";

import {
  fetchAllCharacters,
  fetchAllWeapons,
  fetchAllArtifactSets
} from "@/services/apis/fetch-enka-data";
import { IBaseArtifactSet } from "@/types/artifacts";
import { IBaseCharacter, ICharacter } from "@/types/character";
import { IBaseWeapon } from "@/types/weapon";

export const useCharacterData = () => {
  const { data, error, isLoading } = useSWR(
    "/characters/all",
    fetchAllCharacters
  );

  const characters: ICharacter[] = data?.map((character: IBaseCharacter) => ({
    ...character,
    uniqueId: `${character.enkaId}-${character.skillDepotId}`
  }));

  return {
    characters,
    error,
    isLoading
  };
};

export const useWeaponData = (charatcterWeaponType: string) => {
  const { data, error, isLoading } = useSWR(
    `/weapons/all/${charatcterWeaponType}`,
    () => fetchAllWeapons(charatcterWeaponType)
  );

  const weapons: IBaseWeapon[] = data?.map((weapon: IBaseWeapon) => ({
    ...weapon
  }));

  return {
    weapons,
    error,
    isLoading
  };
};

export const useArtifactData = () => {
  const { data, error, isLoading } = useSWR(
    "/artifacts/all",
    fetchAllArtifactSets
  );

  const artifactSets: IBaseArtifactSet[] = data
    ?.filter((set: IBaseArtifactSet) => set.highestRarity > 3)
    .map((artifactSet: IBaseArtifactSet) => ({
      ...artifactSet,
      id: String(artifactSet.id)
    }));

  return {
    artifactSets,
    error,
    isLoading
  };
};
