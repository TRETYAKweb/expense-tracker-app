import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseList, ExpenseSummary } from "widgets";
import { colors, fonts, getDateMinusDayse } from "shared";
import { expenseModel } from "entities";
import { parseISO } from "date-fns";

export const Screen: React.FC = () => {
  const { data, isFetched } = expenseModel.hooks.useExpense();

  const recentExpenses = data.filter((expense) => {
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

  if (!isFetched) return <Text style={styles.loading}>Loading...</Text>;

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
  loading: {
    fontFamily: fonts.gilroy800,
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
    color: colors.primary[600],
  },
});
