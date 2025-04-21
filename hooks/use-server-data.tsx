import {
  fetchAllCharacters,
  fetchAllWeapons,
} from "@/services/apis/fetch-all-characters";
import { IBaseCharacter, ICharacter } from "@/types/character";
import { IBaseWeapon } from "@/types/weapon";
import useSWR from "swr";

export const useCharacterData = () => {
  const { data, error, isLoading } = useSWR(
    "/characters/all",
    fetchAllCharacters
  );

  const characters: ICharacter[] = data?.map((character: IBaseCharacter) => ({
    ...character,
    uniqueId: `${character.enkaId}-${character.skillDepotId}`,
  }));

  return {
    characters,
    error,
    isLoading,
  };
};

export const useWeaponData = (charatcterWeaponType: string) => {
  console.log("charatcterWeaponType", charatcterWeaponType);
  const { data, error, isLoading } = useSWR(
    `/weapons/all/${charatcterWeaponType}`,
    () => fetchAllWeapons(charatcterWeaponType)
  );

  const weapons: IBaseWeapon[] = data?.map((weapon: IBaseWeapon) => ({
    ...weapon,
  }));

  return {
    weapons,
    error,
    isLoading,
  };
};
