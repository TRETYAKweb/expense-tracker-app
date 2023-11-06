import * as yup from "yup";

const tooShortMessage = "Минимальная длина - ${min} символов";
const tooLongMessage = "максимальная длина - ${max} символов";

export interface IFormData {
  amount: number;
  date: string;
  description: string;
}

export const validationSchema = yup.object().shape({
  amount: yup.number().min(1, tooShortMessage).required("Amount is required"),
  date: yup
    .string()
    .min(8, tooShortMessage)
    .max(10, tooLongMessage)
    .required("Date is required"),
  description: yup
    .string()
    .min(3, tooShortMessage)
    .max(100, tooLongMessage)
    .required("Description is required"),
});
