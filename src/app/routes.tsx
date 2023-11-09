import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ManageExpenseScreen,
  RecentExpensesScreen,
  AllExpensesScreen,
  LoginScreen,
  SignUpScreen,
} from "screens";
import {
  screenNames,
  colors,
  fonts,
  useAppSelector,
  useAppDispatch,
} from "shared";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "shared";
import { authModel } from "entities";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export const BottomTabNavigation: React.FC = () => {
  const { navigate } = useNavigation();

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
        },
        tabBarLabelStyle: {
          fontFamily: fonts.roboto400,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.primary[300],
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            size={31}
            color={tintColor}
            onPress={() => navigate(screenNames.ManageExpense as never)}
          />
        ),
        headerLeft: ({ tintColor }) => {
          const dispatch = useAppDispatch();

          return (
            <IconButton
              color={tintColor}
              size={27}
              name="exit-outline"
              onPress={() => {
                dispatch(authModel.actionsAuth.logout());
              }}
            />
          );
        },
      }}
    >
      <BottomTab.Screen
        name={screenNames.RecentExpenses}
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
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

export const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary[700],
        },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="ExpenseOverview"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name={screenNames.ManageExpense}
        component={ManageExpenseScreen}
      />
    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const Routing: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <StackNavigation />}
    </NavigationContainer>
  );
};
