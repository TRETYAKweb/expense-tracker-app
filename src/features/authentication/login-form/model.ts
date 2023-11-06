import * as yup from "yup";

const tooShortMessage = "Минимальная длина - ${min} символов";
const tooLongMessage = "максимальная длина - ${max} символов";

export interface IFormData {
  email: string;
  password: string;
}

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, tooShortMessage)
    .max(20, tooLongMessage)
    .required("Password is required"),
});
