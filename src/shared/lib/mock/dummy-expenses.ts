import { getFormattedDate } from "../text/utils";

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export const DUMMY_EXPENSES: ExpenseItem[] = [
  {
    id: "e1",
    description: "a pair of shoes",
    amount: 89.99,
    date: getFormattedDate(new Date("2023-01-19")),
  },
  {
    id: "e2",
    description: "groceries",
    amount: 45.67,
    date: getFormattedDate(new Date("2023-02-04")),
  },
  {
    id: "e3",
    description: "restaurant",
    amount: 65.5,
    date: getFormattedDate(new Date("2023-03-15")),
  },
  {
    id: "e4",
    description: "movie tickets",
    amount: 25.0,
    date: getFormattedDate(new Date("2023-04-22")),
  },
  {
    id: "e5",
    description: "gasoline",
    amount: 50.25,
    date: getFormattedDate(new Date("2023-05-07")),
  },
  {
    id: "e6",
    description: "clothing",
    amount: 79.99,
    date: getFormattedDate(new Date("2023-06-10")),
  },
  {
    id: "e7",
    description: "coffee",
    amount: 10.5,
    date: getFormattedDate(new Date("2023-07-18")),
  },
  {
    id: "e8",
    description: "electronics",
    amount: 120.0,
    date: getFormattedDate(new Date("2023-08-29")),
  },
  {
    id: "e9",
    description: "books",
    amount: 30.75,
    date: getFormattedDate(new Date("2023-09-05")),
  },
  {
    id: "e10",
    description: "gift",
    amount: 15.0,
    date: getFormattedDate(new Date("2023-10-12")),
  },
  {
    id: "e11",
    description: "fast food",
    amount: 22.45,
    date: getFormattedDate(new Date("2023-11-23")),
  },
  {
    id: "e12",
    description: "parking",
    amount: 5.0,
    date: getFormattedDate(new Date("2023-12-30")),
  },
  {
    id: "e13",
    description: "haircut",
    amount: 35.0,
    date: getFormattedDate(new Date("2024-01-06")),
  },
  {
    id: "e14",
    description: "gym membership",
    amount: 60.0,
    date: getFormattedDate(new Date("2024-02-14")),
  },
  {
    id: "e15",
    description: "snacks",
    amount: 8.75,
    date: getFormattedDate(new Date("2024-03-22")),
  },
  {
    id: "e16",
    description: "concert tickets",
    amount: 75.0,
    date: getFormattedDate(new Date("2024-04-10")),
  },
  {
    id: "e17",
    description: "pet food",
    amount: 20.25,
    date: getFormattedDate(new Date("2024-05-15")),
  },
  {
    id: "e18",
    description: "taxi",
    amount: 40.0,
    date: getFormattedDate(new Date("2024-06-20")),
  },
  {
    id: "e19",
    description: "home decor",
    amount: 70.0,
    date: getFormattedDate(new Date("2024-07-27")),
  },
  {
    id: "e20",
    description: "medication",
    amount: 15.75,
    date: getFormattedDate(new Date("2024-08-02")),
  },
];

export const mockData: ExpenseItem = {
  id: Math.floor(Math.random() * 1000000).toString(),
  description: "Test",
  amount: 99.99,
  date: getFormattedDate(new Date("2023-01-19")),
};
