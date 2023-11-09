import { useNavigation } from "@react-navigation/native";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import {
  IAuthenticate,
  api,
  openNotificationError,
  openNotificationSuccess,
  setDataToAs,
  useAppDispatch,
} from "shared";

const initialState: IAuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = !!state.token;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = !!state.token;
    },
  },
});

// Hooks

interface ISuccessData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

//TODO БАГ С onSuccess!!!

const useLogIn = () => {
  const dispatch = useAppDispatch();
  const mutation = useMutation(
    async (user: IAuthenticate) => {
      return api.auth.logIn(user).catch((error: AxiosError) => {
        Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials"
        );
        openNotificationError(error.message);
      });
    },
    {
      onSuccess(data: ISuccessData) {
        const token = data?.idToken;
        if (token) {
          dispatch(authSlice.actions.authenticate(token));
          setDataToAs("token", data?.idToken);
          openNotificationSuccess("LogIn successful!");
        }
      },
      onError(error: AxiosError) {
        openNotificationError(error.message);
      },
    }
  );

  return mutation;
};

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const mutation = useMutation(
    async (user: IAuthenticate) => {
      return api.auth.signUp(user).catch((error: AxiosError) => {
        Alert.alert(
          "Registration failed.",
          "Please check the entered information and try again"
        );
        openNotificationError(error.message);
      });
    },
    {
      onSuccess(data: ISuccessData) {
        const token = data?.idToken;
        if (token) {
          dispatch(authSlice.actions.authenticate(token));
          setDataToAs("token", data?.idToken);
          openNotificationSuccess("SignUp successful!");
        }
      },
      onError(error: AxiosError) {
        openNotificationError(error.message);
      },
    }
  );

  return mutation;
};

export const authModel = {
  reducer: authSlice.reducer,
  actionsAuth: {
    authenticate: authSlice.actions.authenticate,
    logout: authSlice.actions.logout,
  },
  hooks: {
    useLogIn,
    useSignUp,
  },
};

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
}
