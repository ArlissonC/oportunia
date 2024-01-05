export const convertInputCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

export const convertCurrency = (value: string | number) => {
  const numericValue = String(value)
    .replace(/[a-zA-Z$]/g, "")
    .replace(",", ".");

  const formattedValue = Number(numericValue).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};
