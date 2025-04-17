import { fetchAllCharacters } from "@/services/apis/fetch-all-characters";
import { IBaseCharacter, ICharacter } from "@/types/character";
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
