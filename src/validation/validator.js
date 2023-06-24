import * as Yup from "yup";
import client from "./../services/client";

export const validateSignUp = Yup.object({
  name: Yup.string()
    .min(2, "Must be at least 2 characters long.")
    .max(65, "Must be less than 66 characters long.")
    .required("Name is required."),
  username: Yup.string()
    .min(3, "Must be at least 3 characters long.")
    .max(30, "Must be less than 31 characters long.")
    .test("username", "Username is already taken", async (value) => {
      try {
        const response = await client.get(`/users/check-username/${value}`);
        return !response.data;
      } catch (err) {
        console.error(err);
        return false;
      }
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

export const validateSignIn = Yup.object({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

export const validateBookmarkAdd = Yup.object({
  title: Yup.string().required("Title is required."),
  url: Yup.string().required("URL is required."),
});

export const validateFolderAdd = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .test("name", "Folder with that name already exists", async (value) => {
      try {
        const response = await client.get(`/folders/check-folder/${value}`);
        return !response.data;
      } catch (err) {
        console.error(err);
        return false;
      }
    }),
});
