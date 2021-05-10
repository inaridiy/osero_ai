export const deepCopy = (field) => {
  return field.map((line) => [...line]);
};
