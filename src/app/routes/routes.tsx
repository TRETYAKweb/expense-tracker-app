import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./stack-navigation";

export const Routing: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
