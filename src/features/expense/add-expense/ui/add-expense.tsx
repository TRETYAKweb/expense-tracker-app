import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Button, ExpenseItem, useAppDispatch } from "shared";

interface AddExpenseProps {
  data: ExpenseItem;
  addExpense: (data: ExpenseItem) => PayloadAction<ExpenseItem>;
}

export const AddExpense: React.FC<AddExpenseProps> = ({ data, addExpense }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePress = (data: ExpenseItem) => {
    dispatch(addExpense(data));
    navigation.goBack();
  };

  return <Button onPress={() => handlePress(data)}>Add</Button>;
};
