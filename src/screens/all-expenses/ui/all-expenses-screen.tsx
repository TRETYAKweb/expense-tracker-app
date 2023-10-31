import React from "react";
import { LoadingOverlay } from "shared";
import { StyleSheet, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";
import { expenseModel } from "entities";

export const Screen: React.FC = () => {
  const { data, isFetched } = expenseModel.hooks.useExpense();

  if (!isFetched) return <LoadingOverlay />;

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
});
