import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, colors, useAppDispatch } from "shared";

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
  const navigate = useNavigation();

  const handlePress = (data: { id: string; data: Partial<ExpenseItem> }) => {
    dispatch(updateExpense(data));
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
            }}
          />
          <Input
            lable="Date:"
            inputConfig={{
              keyboardType: "default",
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
            }}
          />
        </View>
        <View style={styles.innerInput}>
          <Input
            lable="Description:"
            inputConfig={{
              keyboardType: "default",
              placeholder: "Description",
              multiline: true,
            }}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button mode="flat" onPress={() => navigate.goBack()}>
          Cancle
        </Button>
        <Button onPress={() => handlePress(data)}>Update</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.gray[500],
  },
  innerInput: {
    flexDirection: "row",
    gap: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
