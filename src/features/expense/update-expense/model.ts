import { ExpenseItem } from "shared";

export const createExpense = (expenseData: Partial<ExpenseItem>) => {
  let amount =
    typeof expenseData.amount === "string" ? parseFloat(expenseData.amount) : 0;
  if (isNaN(amount)) amount = 0;
  return {
    description: expenseData.description || "",
    date: expenseData.date || "",
    amount: amount || 0,
  };
};

export const isValidForm = (inputValues: inputValuesState) => {
  const isValidAmount = inputValues.amount > 0 && !isNaN(inputValues.amount);
  const isValidDate = inputValues.date.length > 7;
  const isValidDescription = inputValues.description.length > 0;

  return {
    isValidAmount,
    isValidDate,
    isValidDescription,
  };
};

export interface inputValuesState {
  amount: number;
  description: string;
  date: string;
}
