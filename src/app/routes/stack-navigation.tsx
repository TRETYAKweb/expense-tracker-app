import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageExpenseScreen } from "../../screens";
import { BottomTabNavigation } from "./bottom-tab-navigator";
import { screenNames } from "../../shared/lib";
const Stack = createNativeStackNavigator();

export const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpenseOverview"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screenNames.ManageExpense}
        component={ManageExpenseScreen}
      />
    </Stack.Navigator>
  );
};
