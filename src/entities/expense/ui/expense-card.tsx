import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ExpenseItem } from "shared";
import { capitalizeFirstLetter, colors, fonts, screenNames } from "shared";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  ManageExpense: { expenseId: string };
};

interface CardProps {
  expense: ExpenseItem;
}

export const Card: React.FC<CardProps> = ({ expense }) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () =>
    expense.id &&
    navigate(screenNames.ManageExpense, { expenseId: expense.id });

  return (
    <Pressable
      onPress={() => handlePress()}
      style={({ pressed }) =>
        pressed ? [styles.root, styles.pressed] : styles.root
      }
    >
      <View>
        <Text style={styles.description}>
          {capitalizeFirstLetter(expense.description)}
        </Text>
        <Text style={styles.date}>{expense.date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: colors.primary[700],
    marginVertical: 5,
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  pressed: {
    opacity: 0.8,
  },

  description: {
    fontFamily: fonts.gilroy800,
    maxWidth: 200,
    fontSize: 20,
    color: colors.white,
    lineHeight: 20,
    marginBottom: 6,
  },

  date: {
    fontFamily: fonts.roboto400,
    fontSize: 17,
    lineHeight: 17,
    color: colors.white,
  },
  amountContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    minWidth: 100,
    borderRadius: 8,
  },
  amount: {
    fontFamily: fonts.roboto700,
    color: colors.primary[900],
    fontSize: 17,
    lineHeight: 17,
  },
});
