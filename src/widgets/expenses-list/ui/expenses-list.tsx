import React from "react";
import { FlatList, Text, View } from "react-native";
import { ExpenseItem } from "shared/lib/mock/dummy-expenses";

interface ListProps {
  expenses: ExpenseItem[];
}

export const List: React.FC<ListProps> = ({ expenses }) => {
  const renderItem = ({ item }: { item: ExpenseItem }) => {
    return (
      <View>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return <FlatList data={expenses} renderItem={renderItem} />;
};
