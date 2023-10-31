import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LoadingOverlay, capitalizeFirstLetter, colors, fonts } from "shared";
import { DeleteExpense, AddExpense, UpdateExpense } from "features";
import { expenseModel } from "entities";

export type RootStackParamList = {
  ManageExpense: { expenseId: string };
};

export const Screen: React.FC = () => {
  const navigate = useNavigation();
  const { data, isFetched } = expenseModel.hooks.useExpense();
  const route = useRoute<RouteProp<RootStackParamList>>();

  const expenseId: string = route.params?.expenseId;
  const isEditing: boolean = Boolean(expenseId);

  const expenseItem = data.find((item) => item.id === expenseId);

  useLayoutEffect(() => {
    navigate.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigate, isEditing]);

  if (!isFetched) return <LoadingOverlay />;
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={styles.root}>
          <Text style={styles.title}>Your Expense</Text>
          {isEditing && expenseItem && (
            <View style={styles.inner}>
              <View>
                <Text style={styles.description}>
                  {capitalizeFirstLetter(expenseItem.description)}
                </Text>
                <Text style={styles.amount}>${expenseItem.amount}</Text>
              </View>
              <DeleteExpense id={expenseId} />
            </View>
          )}
          {isEditing && expenseItem ? (
            <UpdateExpense defaultValue={expenseItem} id={expenseId} />
          ) : (
            <AddExpense addExpense={expenseModel.actionsExpense.addExpdense} />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[500],
  },
  description: {
    fontFamily: fonts.gilroy800,
    fontSize: 18,
  },
  amount: {
    fontFamily: fonts.gilroy300,
    fontSize: 24,
  },
  title: {
    fontFamily: fonts.gilroy800,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
});
