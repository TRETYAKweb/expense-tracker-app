import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Button, colors, useAppDispatch } from "shared";

interface DeletedExpenseProps {
  id: string;
  onDeleteExpense: (id: string) => PayloadAction<string>;
}

export const DeleteExpense: React.FC<DeletedExpenseProps> = ({
  id,
  onDeleteExpense,
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handlePress = (id: string): void => {
    dispatch(onDeleteExpense(id));
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
