import React, { useEffect } from "react";
import { ExpenseItem, useAppSelector } from "shared";
import { StyleSheet, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";

export const Screen: React.FC = () => {
  const expenses: ExpenseItem[] = useAppSelector(
    (state) => state.expense.expenses
  );

  return (
    <View style={styles.root}>
      <ExpenseSummary expensesPeriod="Total" expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 25,
  },
});
