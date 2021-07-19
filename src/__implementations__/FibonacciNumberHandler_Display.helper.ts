import { ObjectKeysAndFrequency } from './models/ObjectKeysAndFrequency.interface';

export const insertNumberByKeyWithFrequencyValue = (
  x: number,
  obj: ObjectKeysAndFrequency = {}
): ObjectKeysAndFrequency => {
  const newFrequency = obj[x] + 1 || 1;
  const newInsertedNumbersFrequencyState = {
    ...obj,
  };
  newInsertedNumbersFrequencyState[x] = newFrequency;
  return newInsertedNumbersFrequencyState;
};

export const sortObjectByValueDescending = (
  obj: ObjectKeysAndFrequency
): [string, number][] => {
  const entries = Object.entries(obj); // [[key1, value1], [key2, value2], ...]
  return entries.sort((a, b) => b[1] - a[1]);
};

export const doesStringContainOnlyNumbers = (str: string): boolean => {
  return /^\d+$/.test(str);
};
