import axios from "axios";
import { API_URL } from "shared/constants";
import { ExpenseItem } from "shared/lib";

interface IExpenseData {
  [key: string]: ExpenseItem;
}

interface FirebaseResponse<T> {
  data: T;
}

export const api = Object.freeze({
  expense: {
    fetch: async () => {
      const response = await axios.get(`${API_URL}/expenses.json`);

      const expenses: ExpenseItem[] = [];

      for (const key in response.data) {
        const expenseObj = {
          id: key,
          amount: response.data[key].amount,
          date: response.data[key].date,
          description: response.data[key].date,
        };
        expenses.push(expenseObj);
      }

      return expenses;
    },
    create: async (
      data: ExpenseItem
    ): Promise<FirebaseResponse<{ name: string }>> => {
      const res = await axios.post(`${API_URL}/expenses.json`, data);
      return res.data;
    },
  },
});
