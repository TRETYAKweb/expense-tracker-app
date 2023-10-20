import React from "react";
import { DUMMY_EXPENSES } from "shared";
import { StyleSheet, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";

export const Screen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ExpenseSummary expensesPeriod="Total" expenses={DUMMY_EXPENSES} />
      <ExpenseList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 25,
  },
});
