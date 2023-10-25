import { ExpenseItem } from "shared";

export const createExpense = (expenseData: Partial<ExpenseItem>) => {
  let amount =
    typeof expenseData.amount === "string" ? parseFloat(expenseData.amount) : 0;
  if (isNaN(amount)) amount = 0;
  return {
    description: expenseData.description || "",
    date: expenseData.date || "",
    amount: amount || 0,
    id: Math.floor(Math.random() * 1000000).toString(),
  };
};
