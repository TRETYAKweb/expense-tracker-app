import React from "react";
import { colors, fonts } from "shared";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";
import { expenseModel } from "entities";

export const Screen: React.FC = () => {
  const { data, isFetched } = expenseModel.hooks.useExpense();

  if (!isFetched) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.root}>
      <ExpenseSummary expensesPeriod="Total" expenses={data} />
      <ExpenseList expenses={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 25,
  },

  loading: {
    fontFamily: fonts.gilroy800,
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
    color: colors.primary[600],
  },
});
