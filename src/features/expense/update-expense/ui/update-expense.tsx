import React from "react";
import { ExpenseItem } from "shared";
import { Form } from "features/expense/form";

interface UpdateExpenseProps {
  id: string;
  defaultValue: ExpenseItem;
  isEditing: boolean;
}

export const UpdateExpense: React.FC<UpdateExpenseProps> = ({
  id,
  defaultValue,
}) => {
  return <Form isEditing id={id} defaultValue={defaultValue} />;
};
