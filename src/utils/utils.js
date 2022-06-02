import dayjs from "dayjs";

export const objValuesArr = (obj) => {
  return Object.values(obj);
};

export const getFormatDate = (date) => {
  const FORMAT_DATE = "DD/MM/YYYY";
  return dayjs(date).format(FORMAT_DATE);
};
