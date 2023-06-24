import httpClient, { header } from "./client";

export const getAllFolders = () => {
  return httpClient.get("/folders", { headers: header() });
};

export const saveFolder = (folder) => {
  return httpClient.post("/folders", folder, { headers: header() });
};
