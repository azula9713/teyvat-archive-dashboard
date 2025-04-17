import httpClient from "../http-client";

export const fetchAllCharacters = async () => {
  console.log("Fetching characters");
  try {
    const response = await httpClient.get("/characters/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
