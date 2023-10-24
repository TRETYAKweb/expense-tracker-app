import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, colors, useAppDispatch } from "shared";

interface AddExpenseProps {
  data: ExpenseItem;
  addExpense: (data: ExpenseItem) => PayloadAction<ExpenseItem>;
}

export const AddExpense: React.FC<AddExpenseProps> = ({ data, addExpense }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  const handlePress = (data: ExpenseItem) => {
    dispatch(addExpense(data));
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
        <Button onPress={() => handlePress(data)}>Add</Button>
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
});
