import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../shared/lib";
import { ExpenseItem } from "shared/lib/mock/dummy-expenses";

interface SummaryProps {
  expenses: ExpenseItem[];
  expensesPeriod: string;
}

export const Summary: React.FC<SummaryProps> = ({
  expenses,
  expensesPeriod,
}) => {
  const totalSum = expenses.reduce((acum, item) => {
    return acum + item.amount;
  }, 0);

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <Text style={styles.expensesPeriod}>{expensesPeriod}</Text>
        <View style={styles.totalSum}>
          <Text style={styles.dollar}>$</Text>
          <Text style={styles.text}>{totalSum.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[500],
  },

  inner: {
    paddingHorizontal: 25,
  },

  expensesPeriod: {
    fontFamily: fonts.gilroy800,
    fontSize: 17,
    marginBottom: 5,
    color: colors.accent,
  },
  totalSum: {
    flexDirection: "row",
  },
  text: {
    fontFamily: fonts.gilroy300,
    fontSize: 70,
  },
  dollar: {
    fontFamily: fonts.gilroy300,
    fontSize: 40,
    marginTop: 10,
    marginRight: 5,
    color: colors.primary[900],
  },
});
