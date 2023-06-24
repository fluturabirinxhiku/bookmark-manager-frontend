import axios from "axios";

export default axios.create({
  baseURL: "/api",
});

export const header = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};
