import { configureStore } from "@reduxjs/toolkit";
import { expenseModel } from "entities";

export const store = configureStore({
  reducer: {
    expense: expenseModel.reducer,
  },
});
