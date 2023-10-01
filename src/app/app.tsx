import React from "react";
import { StatusBar } from "expo-status-bar";
import { Routing } from "./routes/routes";

export const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <Routing />
    </>
  );
};
