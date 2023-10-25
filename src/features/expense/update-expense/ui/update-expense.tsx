import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, useAppDispatch } from "shared";
import { createExpense } from "../model";

interface UpdateExpenseProps {
  id: string;
  updateExpense: (payload: {
    id: string;
    data: Partial<ExpenseItem>;
  }) => PayloadAction<{ id: string; data: Partial<ExpenseItem> }>;
}

export const UpdateExpense: React.FC<UpdateExpenseProps> = ({
  updateExpense,
  id,
}) => {
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

  const handlePress = (id: string) => {
    const data = createExpense(inputValues);
    dispatch(updateExpense({ id, data }));
    navigate.goBack();
  };

  return (
    <View>
      <View style={styles.inputContainer}>
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
        <Button onPress={() => handlePress(id)}>Update</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
  },
  innerInput: {
    flexDirection: "row",
    gap: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowInput: {
    flex: 1,
  },
});
