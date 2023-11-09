import axios from "axios";
import { API_URL, AUTHENTICATION_URL, API_KEY } from "shared/constants";
import { ExpenseItem, getDataFromAs } from "shared/lib";

export interface IAuthenticate {
  email: string;
  password: string;
}

type TypeMode = "signUp" | "signInWithPassword";

const getToken = async (): Promise<string> => {
  const token = await getDataFromAs("token");
  return typeof token === "string" ? token : "";
};

const authenticate = async (mode: TypeMode, user: IAuthenticate) => {
  const response = await axios.post(
    `${AUTHENTICATION_URL}${mode}?key=${API_KEY}`,
    user
  );
  return response.data;
};

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
      await axios.delete(`${API_URL}/expenses/${id}.json`);
    },
  },
  auth: {
    signUp: async (user: IAuthenticate) => {
      const data = await authenticate("signUp", user);
      return data;
    },
    logIn: async (user: IAuthenticate) => {
      const data = await authenticate("signInWithPassword", user);
      return data;
    },
  },
});
