import { useMutation } from "react-query";
import {
  ISignUp,
  api,
  openNotificationError,
  openNotificationSuccess,
  setDataToAs,
} from "shared";
import { AxiosError } from "axios";
import * as yup from "yup";

const tooShortMessage = "Минимальная длина - ${min} символов";
const tooLongMessage = "максимальная длина - ${max} символов";

export interface IFormData {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email")], "Emails must match")
    .required("*"),
  password: yup
    .string()
    .min(3, tooShortMessage)
    .max(20, tooLongMessage)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("*"),
});

// Hooks

interface ISuccessData {
  email: string;
  expiresIn: string;
  idToken: string;
}

export const useSignUp = () => {
  const mutation = useMutation(
    (user: ISignUp) => {
      return api.signUp(user);
    },
    {
      onSuccess(data: ISuccessData) {
        openNotificationSuccess("Регистрация прошла успешно");
        setDataToAs("token", data?.idToken);
      },
      onError(error: AxiosError) {
        const { message } = error;
        openNotificationError(message);
      },
    }
  );

  return mutation;
};
