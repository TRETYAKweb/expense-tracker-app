import { ExpenseItem } from "shared";

export const createExpense = (expenseData: Partial<ExpenseItem>) => {
  let amount: number = 0;

  if (typeof expenseData.amount === "string") {
    amount = parseFloat(expenseData.amount);
    if (isNaN(amount)) amount = 0;
  } else if (typeof expenseData.amount === "number") {
    amount = expenseData.amount;
  }

  return {
    description: expenseData.description || "",
    date: expenseData.date || "",
    amount: amount,
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
