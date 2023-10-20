import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { DUMMY_EXPENSES } from "shared";
import { capitalizeFirstLetter, colors, fonts } from "shared";
import { Button } from "shared";

export type RootStackParamList = {
  ManageExpense: { expenseId: string };
};

export const Screen: React.FC = () => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList>>();

  const expenseId: string = route.params?.expenseId;
  const isEditing: boolean = Boolean(expenseId);

  const expenseItem = DUMMY_EXPENSES.find((item) => item.id === expenseId);

  useLayoutEffect(() => {
    navigate.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigate, isEditing]);

  return (
    <View style={styles.root}>
      <View style={styles.btnContainer}>
        <Button mode="flat" onPress={() => navigate.goBack()}>
          Cancle
        </Button>
        <Button onPress={() => {}}>{isEditing ? "Update" : "Add"}</Button>
      </View>
      {isEditing && expenseItem && (
        <View style={styles.inner}>
          <View>
            <Text style={styles.description}>
              {capitalizeFirstLetter(expenseItem.description)}
            </Text>
            <Text style={styles.amount}>${expenseItem.amount}</Text>
          </View>
          <Button
            mode="error"
            iconName="trash"
            iconSize={21}
            iconColor={colors.white}
            onPress={() => {}}
          >
            Delete expense
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 25,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontFamily: fonts.gilroy800,
    fontSize: 18,
  },
  amount: {
    fontFamily: fonts.gilroy300,
    fontSize: 24,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[500],
  },
});
