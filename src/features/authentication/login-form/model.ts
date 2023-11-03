import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .email("Email must be a valid email")
    .oneOf([yup.ref("email")], "Email must match"),
});
