import { ExpenseCard } from "entities";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ExpenseItem } from "shared";

interface ListProps {
  expenses: ExpenseItem[];
}

export const List: React.FC<ListProps> = ({ expenses }) => {
  const renderItem = ({ item }: { item: ExpenseItem }) => {
    return <ExpenseCard expense={item} />;
  };

  return (
    <FlatList
      style={styles.root}
      data={expenses}
      renderItem={renderItem}
      extraData={expenses}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 15,
  },
});
