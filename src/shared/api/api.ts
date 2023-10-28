import axios from "axios";
import { API_URL } from "shared/constants";

export interface IExpense {
  amount: number;
  description: string;
  date: string;
  id: string;
}

interface FirebaseResponse<T> {
  data: T;
}

export const api = Object.freeze({
  expense: {
    create: async (data: IExpense): Promise<FirebaseResponse<string>> => {
      const res = axios.post(`${API_URL}/expenses.json`, data);
      return res;
    },
  },
});
