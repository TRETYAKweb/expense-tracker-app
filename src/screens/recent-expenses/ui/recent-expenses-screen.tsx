import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "../../../widgets";
import { DUMMY_EXPENSES } from "../../../shared/lib";

export const Screen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ExpenseSummary
        expensesPeriod="Last 7 Days"
        expenses={DUMMY_EXPENSES.slice(0, 7)}
      />
      <ExpenseList expenses={DUMMY_EXPENSES.slice(0, 7)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 25,
  },
});
