// DD.MM.YY
export const dateFormat = (dateString: string) => {
  const date = new Date(dateString);

  return `${date?.getDate()}.${date?.getMonth()}.${date?.getFullYear()}`.slice(0, 8);
};
