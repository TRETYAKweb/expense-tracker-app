import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RecentExpensesScreen, AllExpensesScreen } from "../../screens";
import React from "react";
import { colors, screenNames } from "../../shared/lib";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary[700],
        },
        headerTitleStyle: {
          fontSize: 21,
        },
        headerTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.primary[900],
          height: 95,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarInactiveTintColor: colors.primary[300],
      }}
    >
      <BottomTab.Screen
        name={screenNames.RecentExpenses}
        component={RecentExpensesScreen}
        options={{
          title: "Recent",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={screenNames.AllExpenses}
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
