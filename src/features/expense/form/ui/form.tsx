import { useNavigation } from "@react-navigation/native";
import { expenseModel } from "entities";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ExpenseItem, Input, colors } from "shared";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormData, validationSchema } from "../model";

interface IFormProps {
  isEditing?: boolean;
  id?: string;
  defaultValue?: ExpenseItem;
}

const initialState: ExpenseItem = {
  amount: 0,
  date: "YYYY-MM-DD",
  description: "",
};

export const Form: React.FC<IFormProps> = ({
  isEditing,
  id,
  defaultValue = initialState,
}) => {
  const createExpense = expenseModel.hooks.useCreateExpense();
  const updateExpense = expenseModel.hooks.useUpdateExpense();
  const navigate = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseItem>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: isEditing ? defaultValue.amount : 1,
      date: isEditing ? defaultValue.date : "",
      description: isEditing ? defaultValue.description : "",
    },
  });

  const onSubmit = (data: IFormData) => {
    if (isEditing && id) {
      updateExpense.mutateAsync({ id, data });
      navigate.goBack();
    } else {
      createExpense.mutateAsync(data);
      navigate.goBack();
    }
  };

  return (
    <View>
      <View>
        <View style={styles.innerInput}>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onBlur, onChange, value } }) => {
              return (
                <Input
                  style={styles.rowInput}
                  label="Amount: "
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value.toString()}
                  error={errors.amount}
                  inputProps={{
                    placeholder: "0",
                    keyboardType: "decimal-pad",
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { onBlur, onChange, value } }) => {
              return (
                <Input
                  style={styles.rowInput}
                  label="Date:"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={errors.date}
                  inputProps={{
                    placeholder: "YYYY-MM-DD",
                    keyboardType: "default",
                  }}
                />
              );
            }}
          />
        </View>
        <Controller
          control={control}
          name="description"
          render={({ field: { onBlur, onChange, value } }) => {
            return (
              <Input
                style={styles.rowInput}
                label="Date:"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                error={errors.description}
                inputProps={{
                  placeholder: "Description",
                  keyboardType: "default",
                  multiline: true,
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button mode="flat" onPress={() => navigate.goBack()}>
          Cancle
        </Button>
        <Button onPress={handleSubmit(onSubmit)}>
          {isEditing ? "Update" : "Add"}
        </Button>
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
