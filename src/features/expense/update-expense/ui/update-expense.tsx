import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Button, ExpenseItem, useAppDispatch } from "shared";

interface UpdateExpenseProps {
  data: { id: string; data: Partial<ExpenseItem> };
  updateExpense: (payload: {
    id: string;
    data: Partial<ExpenseItem>;
  }) => PayloadAction<{ id: string; data: Partial<ExpenseItem> }>;
}

export const UpdateExpense: React.FC<UpdateExpenseProps> = ({
  updateExpense,
  data,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePress = (data: { id: string; data: Partial<ExpenseItem> }) => {
    dispatch(updateExpense(data));
    navigation.goBack();
  };

  return <Button onPress={() => handlePress(data)}>Update</Button>;
};
