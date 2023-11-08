import { useMutation } from "react-query";
import {
  IAuthenticate,
  api,
  openNotificationError,
  openNotificationSuccess,
  setDataToAs,
} from "shared";
import * as yup from "yup";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";

const tooShortMessage = "Минимальная длина - ${min} символов";
const tooLongMessage = "максимальная длина - ${max} символов";

export interface IFormData {
  email: string;
  confirmEmail?: string;
  password: string;
  confirmPassword?: string;
}

interface ISuccessData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Validation

const signUpSchema = yup.object().shape({
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

const logInSchema = yup.object().shape({
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

// Hooks

const useLogIn = () => {
  const mutation = useMutation(
    (user: IAuthenticate) => {
      return api.logIn(user);
    },
    {
      onSuccess(data: ISuccessData) {
        openNotificationSuccess("LogIn successful!");
        const token = data?.idToken;
        if (token) setDataToAs("token", data?.idToken);
      },
      onError(error: AxiosError) {
        openNotificationError(error.message);
      },
    }
  );

  return mutation;
};

const useSignUp = () => {
  const navigation = useNavigation();

  const mutation = useMutation(
    (user: IAuthenticate) => {
      return api.signUp(user);
    },
    {
      onSuccess(data: ISuccessData) {
        openNotificationSuccess("SignUp successful!");
        const token = data?.idToken;
        if (token) setDataToAs("token", data?.idToken);
        navigation.navigate("Login" as never);
      },
      onError(error: AxiosError) {
        openNotificationError(error.message);
      },
    }
  );

  return mutation;
};

export const authenticateModel = {
  schema: {
    signUpSchema,
    logInSchema,
  },
  hooks: {
    useLogIn,
    useSignUp,
  },
};
