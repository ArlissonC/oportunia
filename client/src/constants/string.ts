import { format, parse } from "date-fns";

export const removeSpecialCharacters = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "");
};

export const convertStringToDecimal = (str: string) => {
  const decimalSeparator = str.includes(",") ? "," : ".";
  const cleanedStr = str.replace(
    new RegExp(`[^0-9${decimalSeparator}]`, "g"),
    "",
  );

  const decimalSeparatorCount = cleanedStr.split(decimalSeparator).length - 1;
  if (decimalSeparatorCount > 1) {
    throw new Error(
      "Formato inválido: vários separadores decimais encontrados.",
    );
  }

  const normalizedStr = cleanedStr.replace(decimalSeparator, ".");
  const decimalValue = parseFloat(normalizedStr);

  return decimalValue;
};

export const convertStringInDateTime = (date: string) => {
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());

  if (!isNaN(parsedDate.getTime())) {
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    return formattedDate;
  } else {
    const parsedISODate = parse(date, "yyyy-MM-dd", new Date());

    if (!isNaN(parsedISODate.getTime())) {
      const formattedISODate = format(parsedISODate, "yyyy-MM-dd");
      return formattedISODate;
    } else {
      return date;
    }
  }
};
