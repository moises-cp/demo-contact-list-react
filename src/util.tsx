export const getObjectCopy = (obj: object): any => JSON.parse(JSON.stringify(obj));

export const getUniqueId = (): number => {
  const min = 10;
  const max = 1000000;
  return Math.ceil(Math.random() * (max - min) + min);
}
