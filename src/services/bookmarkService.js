import httpClient, { header } from "./client";

export const getAllBookmarks = () => {
  return httpClient.get("/bookmarks", { headers: header() });
};

export const getAllBookmarksByFolder = (folderName) => {
  return httpClient.get(`/folders/${folderName}/bookmarks`, {
    headers: header(),
  });
};

export const saveBookmark = (bookmark) => {
  return httpClient.post("/bookmarks", bookmark, { headers: header() });
};
