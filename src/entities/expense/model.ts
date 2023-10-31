import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  api,
  ExpenseItem,
  getFormattedDate,
  openNotificationError,
} from "shared";
import { AxiosError } from "axios";
import { useToast } from "react-native-toast-notifications";

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
        date: getFormattedDate(new Date()),
      };
      state.expenses.push(expense);
    },
    delete(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter((it) => it.id !== action.payload);
    },
    updateExpense(
      state,
      action: PayloadAction<{ id: string; data: Partial<ExpenseItem> }>
    ) {
      const expenseIdx = state.expenses.findIndex(
        (it) => it.id === action.payload.id
      );
      const expenseItem = state.expenses[expenseIdx];
      const expenseItemUpdate = { ...expenseItem, ...action.payload.data };
      state.expenses[expenseIdx] = expenseItemUpdate;
    },
  },
});

// Hooks

const useCreateExpense = () => {
  const client = useQueryClient();
  const mutation = useMutation(
    (dataExpense: ExpenseItem) => {
      return api.expense.create(dataExpense);
    },
    {
      onSuccess() {
        client.invalidateQueries({ queryKey: ["expense"] });
      },
      onError(error: AxiosError) {
        const { message } = error;
        openNotificationError(message);
      },
    }
  );
  return mutation;
};

const useUpdateExpense = () => {
  const client = useQueryClient();
  const mutation = useMutation(
    (params: { id: string; updateData: ExpenseItem }) => {
      const { id, updateData } = params;
      return api.expense.update(id, updateData);
    },
    {
      onSuccess() {
        client.invalidateQueries({ queryKey: ["expense"] });
      },
      onError(error: AxiosError) {
        const { message } = error;
        openNotificationError(message);
      },
    }
  );

  return mutation;
};

const useDeleteExpense = () => {
  const client = useQueryClient();
  const mutation = useMutation(
    (id: string) => {
      return api.expense.delete(id);
    },
    {
      onSuccess() {
        client.invalidateQueries({ queryKey: ["expense"] });
      },
      onError(error: AxiosError) {
        const { message } = error;
        openNotificationError(message);
      },
    }
  );

  return mutation;
};

const useExpense = () => {
  const { data, isFetched, isSuccess, refetch } = useQuery(
    "expense",
    api.expense.fetch,
    {
      onError(error: AxiosError) {
        const { message } = error;
        openNotificationError(message);
      },
    }
  );

  return {
    data: Array.isArray(data) ? data : [],
    isFetched,
    isSuccess,
    refetch,
  };
};

export const expenseModel = {
  reducer: expenseSlice.reducer,
  actionsExpense: {
    setExpenses: expenseSlice.actions.setExpenses,
    deleteExpense: expenseSlice.actions.delete,
    addExpdense: expenseSlice.actions.addExpense,
    updateExpense: expenseSlice.actions.updateExpense,
  },
  hooks: {
    useExpense,
    useCreateExpense,
    useUpdateExpense,
    useDeleteExpense,
  },
};

// TYPES

interface ExpenseState {
  expenses: ExpenseItem[];
}
