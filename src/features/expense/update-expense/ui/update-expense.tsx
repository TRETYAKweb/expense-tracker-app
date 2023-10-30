import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, useAppDispatch } from "shared";
import { createExpense, inputValuesState, isValidForm } from "../model";
import { expenseModel } from "entities";

interface UpdateExpenseProps {
  id: string;
  defaultValue: ExpenseItem;
}

export const UpdateExpense: React.FC<UpdateExpenseProps> = ({
  id,
  defaultValue,
}) => {
  const navigate = useNavigation();

  const updateExpense = expenseModel.hooks.useUpdateExpense();

  const [inputValues, setInputValues] = useState<inputValuesState>({
    amount: defaultValue.amount,
    description: defaultValue.description,
    date: defaultValue.date,
  });

  const [isValidInput, setIsValidInput] = useState({
    amount: true,
    description: true,
    date: true,
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
    const updateData = createExpense(inputValues);

    const { isValidAmount, isValidDate, isValidDescription } =
      isValidForm(inputValues);

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      setIsValidInput((prev) => ({
        ...prev,
        amount: isValidAmount,
        date: isValidDate,
        description: isValidDescription,
      }));
      return;
    }
    console.log(updateData);
    updateExpense.mutateAsync({ id, updateData });
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
              value: inputValues.amount?.toString(),
            }}
            style={styles.rowInput}
            isValid={!isValidInput.amount}
          />
          <Input
            lable="Date:"
            inputConfig={{
              keyboardType: "default",
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (text) => inputHandler("date", text),
              value: inputValues.date,
            }}
            style={styles.rowInput}
            isValid={!isValidInput.date}
          />
        </View>
        <Input
          lable="Description:"
          inputConfig={{
            keyboardType: "default",
            placeholder: "Description",
            multiline: true,
            onChangeText: (text) => inputHandler("description", text),
            value: inputValues.description,
          }}
          isValid={!isValidInput.description}
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
