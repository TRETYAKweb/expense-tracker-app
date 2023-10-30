import axios from "axios";
import { API_URL } from "shared/constants";
import { ExpenseItem } from "shared/lib";

// interface FirebaseResponse<T> {
//   data: T;
// }

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
          description: response.data[key].description,
        };
        expenses.unshift(expenseObj);
      }

      return expenses;
    },
    create: async (data: ExpenseItem) => {
      const res = await axios.post(`${API_URL}/expenses.json`, data);
      return res;
    },
    update: async (id: string, updateData: ExpenseItem) => {
      const response = await axios.put(
        `${API_URL}/expenses/${id}.json`,
        updateData
      );
      return response.data;
    },
    delete: async (id: string) => {
      const response = await axios.delete(`${API_URL}/expenses/${id}.json`);
    },
  },
});
