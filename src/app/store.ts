import { configureStore } from "@reduxjs/toolkit";
import { authModel, expenseModel } from "entities";

export const store = configureStore({
  reducer: {
    expense: expenseModel.reducer,
    auth: authModel.reducer,
  },
});
