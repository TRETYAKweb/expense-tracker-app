import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseItem, getFormattedDate, useAppSelector } from "shared";

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<ExpenseItem[]>) {
      state.expenses = action.payload;
    },
    addExpense(state, action: PayloadAction<ExpenseItem>) {
      const expense = {
        ...action.payload,
        date: getFormattedDate(new Date("2024-09-12")),
      };
      state.expenses.push(expense);
    },
    delete(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter((it) => it.id !== action.payload);
    },
    updateExpense(
      state,
      action: PayloadAction<{ id: string; data: ExpenseItem }>
    ) {
      const expenseIdx = state.expenses.findIndex(
        (it) => it.id === action.payload.id
      );
      const expenseItem = state.expenses[expenseIdx];
      const expenseItemUpdate = { ...expenseItem, ...action.payload.data };
      console.log(expenseItemUpdate);
      state.expenses[expenseIdx] = expenseItemUpdate;
    },
  },
});

export const expenseModel = {
  reducer: expenseSlice.reducer,
  selectors: {
    getExpenses: () => useAppSelector((state) => state.expense.expenses),
  },
  actionsExpense: {
    setExpenses: expenseSlice.actions.setExpenses,
  },
};

// TYPES

interface ExpenseState {
  expenses: ExpenseItem[];
}
