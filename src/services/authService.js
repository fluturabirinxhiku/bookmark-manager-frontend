import httpClient, { header } from "./client";

export const signIn = (user) => {
  return httpClient.post("/signin", user, {
    headers: header(),
  });
};

export const signUp = (user) => {
  return httpClient.post("/signup", user, { headers: header() });
};
