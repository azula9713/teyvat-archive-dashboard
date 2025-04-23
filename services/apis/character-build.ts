import { ICharacterBuildInput } from "@/types/build";
import httpClient from "../http-client";

export const createCharacterBuild = async (build: ICharacterBuildInput) => {
  const response = await httpClient.post("/builds/create", build);
  return response.data;
};
