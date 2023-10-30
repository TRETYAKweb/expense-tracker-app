import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import { expenseModel } from "entities";
import React from "react";
import { Button, colors } from "shared";

interface DeletedExpenseProps {
  id: string;
}

export const DeleteExpense: React.FC<DeletedExpenseProps> = ({ id }) => {
  const deleteExpense = expenseModel.hooks.useDeleteExpense();
  const navigation = useNavigation();

  const handlePress = (id: string): void => {
    deleteExpense.mutateAsync(id);
    navigation.goBack();
  };

  return (
    <Button
      mode="error"
      iconName="trash"
      iconSize={21}
      iconColor={colors.white}
      onPress={() => handlePress(id)}
    >
      Delete expense
    </Button>
  );
};
