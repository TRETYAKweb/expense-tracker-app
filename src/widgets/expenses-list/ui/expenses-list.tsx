import { ExpenseCard } from "../../../entities";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ExpenseItem } from "shared/lib/mock/dummy-expenses";

interface ListProps {
  expenses: ExpenseItem[];
}

export const List: React.FC<ListProps> = ({ expenses }) => {
  const renderItem = ({ item }: { item: ExpenseItem }) => {
    return <ExpenseCard expense={item} />;
  };

  return (
    <FlatList style={styles.root} data={expenses} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 15,
  },
});
