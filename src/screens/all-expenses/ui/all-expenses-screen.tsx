import React, { useEffect } from "react";
import { DUMMY_EXPENSES, ExpenseItem, useAppDispatch } from "shared";
import { StyleSheet, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";
import { expenseModel } from "entities";

export const Screen: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(expenseModel.actionsExpense.setExpenses(DUMMY_EXPENSES));
  }, [DUMMY_EXPENSES, dispatch]);

  const expenses: ExpenseItem[] = expenseModel.selectors.getExpenses();

  return (
    <View style={styles.root}>
      <ExpenseSummary expensesPeriod="Total" expenses={DUMMY_EXPENSES} />
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
