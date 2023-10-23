export const getDateMinusDayse = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
};
