import useSWR from "swr";

import { fetchAllBuilds } from "@/services/apis/character-build";
import { ICharacterBuild } from "@/types/build";

export default function useDashboardData() {
  const { data, isLoading, error } = useSWR("/builds/all", fetchAllBuilds);

  return {
    totalBuilds: data?.length,
    builds: data as ICharacterBuild[],
    buildsLoading: isLoading,
    buildsError: error
  };
}
