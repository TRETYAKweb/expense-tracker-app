import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, colors, useAppDispatch } from "shared";
import { createExpense } from "../model";

interface AddExpenseProps {
  addExpense: (data: ExpenseItem) => PayloadAction<ExpenseItem>;
}

export const AddExpense: React.FC<AddExpenseProps> = ({ addExpense }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  const [inputValues, setInputValues] = useState<Partial<ExpenseItem>>({
    amount: 0,
    description: "",
    date: "",
  });

  const inputHandler = (
    inputType: keyof Partial<ExpenseItem>,
    values: string
  ) => {
    setInputValues((currentValues) => ({
      ...currentValues,
      [inputType]: values,
    }));
  };

  const handlePress = () => {
    const expenseData = createExpense(inputValues);
    dispatch(addExpense(expenseData));
    navigate.goBack();
  };

  return (
    <View>
      <View>
        <View style={styles.innerInput}>
          <Input
            lable="Amount:"
            inputConfig={{
              keyboardType: "decimal-pad",
              placeholder: "0",
              onChangeText: (text) => inputHandler("amount", text),
            }}
            style={styles.rowInput}
          />
          <Input
            lable="Date:"
            inputConfig={{
              keyboardType: "default",
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (text) => inputHandler("date", text),
            }}
            style={styles.rowInput}
          />
        </View>
        <Input
          lable="Description:"
          inputConfig={{
            keyboardType: "default",
            placeholder: "Description",
            multiline: true,
            onChangeText: (text) => inputHandler("description", text),
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button mode="flat" onPress={() => navigate.goBack()}>
          Cancle
        </Button>
        <Button onPress={() => handlePress()}>Add</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    paddingTop: 15,
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.gray[500],
  },
  innerInput: {
    flexDirection: "row",
    gap: 15,
  },
  rowInput: {
    flex: 1,
  },
});
