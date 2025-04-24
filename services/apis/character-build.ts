import { ICharacterBuild } from "@/types/build";

import httpClient from "../http-client";

export const createCharacterBuild = async (build: ICharacterBuild) => {
  const response = await httpClient.post("/builds/create", build);
  return response.data;
};

export const fetchAllBuilds = async () => {
  const response = await httpClient.get("/builds/all");
  return response.data;
};
