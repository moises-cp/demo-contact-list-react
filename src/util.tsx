import { ContactList } from './types';

export const getObjectCopy = (obj: Object): any =>
  JSON.parse(JSON.stringify(obj));

export const getUniqueId = (): number => {
  const min = 10;
  const max = 1000000;
  return Math.ceil(Math.random() * (max - min) + min);
};

export const sortObjectByFirstNameAsc = (obj: ContactList): ContactList => {
  return getObjectCopy(obj).sort(function (a: any, b: any) {
    if (a.firstName === b.firstName) {
      return 0;
    }
    return a.firstName > b.firstName ? 1 : -1;
  });
};

export const toUpperFirstLetter = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
