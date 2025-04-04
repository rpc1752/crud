import * as yup from "yup";

export const userSchema = yup.object({
  user: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters long"),
  interest: yup
    .array()
    .of(yup.string())
    .min(1, "At least one interest must be provided"),
  age: yup
    .number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),
  mobile: yup
    .number()
    .required("Mobile number is required")
    .test(
      "len",
      "Mobile number must be between 10 and 15 digits",
      function (val) {
        if (!val) return false;
        const length = val.toString().length;
        return length >= 10 && length <= 15;
      }
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

export interface UserData {
  _id?: string; // Make _id optional but explicitly defined
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

export interface UserFormData extends Omit<UserData, "_id"> {
  _id?: string;
}
