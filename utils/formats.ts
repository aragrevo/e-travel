export const toCurrency = (value: number) => {
  return `$ ${Intl.NumberFormat("ES-es", {
    currency: "USD",
  }).format(Math.round(value))}`;
};

export const getWeekDay = (value: string) => {
  const f = formatDate(value).split("/");
  const d = new Date(+f[2], +f[1] - 1, +f[0]);
  return d.toString().split(" ")[0];
};

export const formatDate = (value: string) => {
  return `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(
    4
  )}`;
};
