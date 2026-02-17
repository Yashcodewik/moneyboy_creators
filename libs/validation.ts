import * as yup from "yup";

export const validationSchemaCreator = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  displayName: yup.string().required("Display name is required"),
  userName: yup
    .string()
    .matches(/^[A-Za-z0-9]{5,20}$/, "Username must be 5-20 characters long")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.string().required("Date of birth is required"),
  bio: yup.string().required("Bio is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  age: yup.string(),
  // bodyType: yup.string().required("Body type is required"),
  // sexualOrientation: yup.string().required("Sexual orientation is required"),
  // age: yup.string().required("Age is required"),
  // eyeColor: yup.string().required("Eye color is required"),
  // hairColor: yup.string().required("Hair color is required"),
  // ethnicity: yup.string().required("Ethnicity is required"),
  // height: yup.string().required("Height is required"),
  // style: yup.string().required("Style is required"),
  // size: yup.string().required("Size is required"),
  // popularity: yup.string().required("Popularity is required"),
});

export const validationSchemaCreatorUpdate = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  displayName: yup.string().required("Display name is required"),
  userName: yup
    .string()
    .matches(/^[A-Za-z0-9]{5,20}$/, "Username must be 5-20 characters long")
    .required("Username is required"),
  gender: yup.string().required("Gender is required"),
  // dob: yup.string().required("Date of birth is required"),
  // bio: yup.string().required("Bio is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  // bodyType: yup.string().required("Body type is required"),
  // sexualOrientation: yup.string().required("Sexual orientation is required"),
  // age: yup.string().required("Age is required"),
  // eyeColor: yup.string().required("Eye color is required"),
  // hairColor: yup.string().required("Hair color is required"),
  // ethnicity: yup.string().required("Ethnicity is required"),
  // height: yup.string().required("Height is required"),
  // style: yup.string().required("Style is required"),
  // size: yup.string().required("Size is required"),
  // popularity: yup.string().required("Popularity is required"),
  age: yup.string(),
});
