
export const getUniqueId = (): number => {
  const min = 10;
  const max = 1000000;
  return Math.ceil(Math.random() * (max - min) + min);
}