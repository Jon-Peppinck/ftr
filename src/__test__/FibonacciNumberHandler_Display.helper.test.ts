import {
  insertNumberByKeyWithFrequencyValue,
  sortObjectByValueDescending,
  doesStringContainOnlyNumbers,
} from '../__implementations__/FibonacciNumberHandler_Display.helper';

describe('insertNumberByKeyWithFrequencyValue fn', () => {
  it('it should return return a key `1` and a frequency count of 1', () => {
    expect(insertNumberByKeyWithFrequencyValue(1)).toEqual({ '1': 1 });
  });
  it('it should return return a key `1` and a frequency count of 2', () => {
    expect(insertNumberByKeyWithFrequencyValue(1, { '1': 1 })).toEqual({
      '1': 2,
    });
  });
  it('it should return return a key `1` and a frequency count of 2 and a key `2` with a frequency of 1', () => {
    expect(insertNumberByKeyWithFrequencyValue(2, { '1': 2 })).toEqual({
      '1': 2,
      '2': 1,
    });
  });
});

describe('sortObjectByValueDescending fn', () => {
  it('it should return an empty tuple array for an empty object', () => {
    expect(sortObjectByValueDescending({})).toEqual([]);
  });
  it('it should return a tuple array with its first element being the array format of the input', () => {
    expect(sortObjectByValueDescending({ '1': 1 })).toEqual([['1', 1]]);
  });
  it('it should return a sorted tuple array in descending order by frequency', () => {
    expect(sortObjectByValueDescending({ '1': 1, '2': 3, '3': 5 })).toEqual([
      ['3', 5],
      ['2', 3],
      ['1', 1],
    ]);
  });
});

describe('doesStringContainOnlyNumbers fn', () => {
  it('it should return false if a string is passed', () => {
    expect(doesStringContainOnlyNumbers('string')).toEqual(false);
  });
  it('it should return false if a string and numbers are passed', () => {
    expect(doesStringContainOnlyNumbers('123z')).toEqual(false);
  });
  it('it should return true if a number is passed', () => {
    expect(doesStringContainOnlyNumbers('123')).toEqual(true);
  });
});
