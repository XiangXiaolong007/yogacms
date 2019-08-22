export const isValidUsername = (str: string) =>
  ["admin"].indexOf(str.trim()) >= 0;
