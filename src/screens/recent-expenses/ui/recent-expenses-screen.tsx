import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";
import {
  DUMMY_EXPENSES,
  ExpenseItem,
  getDateMinusDayse,
  useAppDispatch,
  useAppSelector,
} from "shared";
import { expenseModel } from "entities";
import { parseISO } from "date-fns";

export const Screen: React.FC = () => {
  const dispatch = useAppDispatch();

  const expenses: ExpenseItem[] = useAppSelector(
    (state) => state.expense.expenses
  );

  const recentExpenses = expenses.filter((expense) => {
    if (expense.date) {
      const dateParts = expense.date.split("-");
      if (dateParts.length === 3) {
        const isoDateString = `${dateParts[0]}-${dateParts[1].padStart(
          2,
          "0"
        )}-${dateParts[2].padStart(2, "0")}`;
        const date = parseISO(isoDateString);
        const last7Days = getDateMinusDayse(new Date(), 7);
        return date > last7Days;
      }
    }
    return false;
  });

  useEffect(() => {
    dispatch(expenseModel.actionsExpense.setExpenses(DUMMY_EXPENSES));
  }, []);

  return (
    <View style={styles.root}>
      <ExpenseSummary expensesPeriod="Last 7 Days" expenses={recentExpenses} />
      <ExpenseList expenses={recentExpenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 25,
  },
});
