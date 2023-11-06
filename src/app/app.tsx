import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Routing } from "./routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontAssets } from "shared";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Routing />
        </Provider>
      </QueryClientProvider>
      <Toast />
    </>
  );
};
