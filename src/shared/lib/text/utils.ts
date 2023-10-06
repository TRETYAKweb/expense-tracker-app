export const capitalizeFirstLetter = (str: string): string =>
  str[0].toUpperCase() + str.slice(1);

export const getFormattedDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}`;
