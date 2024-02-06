import * as yup from "yup";

export const signUpValidate = yup
  .object({
    name: yup
      .string()
      .required("Enter your name")
      .min(4, "Name at least 4 Characters"),
    username: yup
      .string()
      .required("Enter your username")
      .min(4, "Username at least 4 Characters"),
    email: yup
      .string()
      .required("Enter your email")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email is not valid",
      ),
    password: yup
      .string()
      .required("Enter your password")
      .min(8, "Password at least 8 Characters"),
  })
  .defined();

export const signInValidate = yup.object({
  email: yup
    .string()
    .required("Enter your email"),
  password: yup
    .string()
    .required("Enter your password"),
});

export const createPostValidate = yup
  .object()
  .shape({
    caption: yup
      .string()
      .required("Caption cant't be emptied"),
    attachment: yup
      .mixed()
      .test(
        "required",
        "There aren't any images here",
        (value) => value.length > 0,
      )
      .test(
        "fileSize",
        "The file is too large",
        (value) => {
          if (!value.length) return true;
          return value[0].size <= 3000000;
        },
      ),
    tags: yup
      .string()
      .matches(
        /^[\w,\s\d]*$/g,
        "Tags cant have special character",
      ),
    location: yup.string(),
  });

export const updatePostValidate = yup
  .object()
  .shape({
    caption: yup
      .string()
      .required("Caption cant't be emptied"),
    attachment: yup
      .mixed()
      .test(
        "fileSize",
        "The file is too large",
        (value) => {
          if (!value.length) return true;
          return value[0].size <= 2000000;
        },
      ),
    tags: yup.string(),
    location: yup.string(),
  });
