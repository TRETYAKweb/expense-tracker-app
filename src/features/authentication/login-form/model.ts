import * as yup from "yup";

export interface IFormData {
  email: string;
  password: string;
}

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
