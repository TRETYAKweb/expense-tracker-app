import React from "react";
import { ExpenseList, ExpenseSummary } from "../../../widgets";
import { DUMMY_EXPENSES } from "../../../shared/lib";
import { StyleSheet, View } from "react-native";

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
    paddingHorizontal: 25,
    paddingTop: 25,
  },
});
