import { GetFibonacciNumbersFn } from '../__implementations__/models/GetFibonacciNumbersFn.interface';

import {
  _getFibonacciNumbers,
  getStatusOfPotentialFibonacciNumber,
} from '../__implementations__/FibonacciNumberHandler.helper';

// http://www.fullbooks.com/The-first-1001-Fibonacci-Numbers.html
const FIB_50_TERM = 12586269025n;
const FIB_100_TERM = 354224848179261915075n;
const FIB_1000_TERM =
  43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n;

describe('_getFibonacciNumbers fn', () => {
  describe('handle non-positive integer arguments', () => {
    it('it should return an empty array if a negative term is passed', () => {
      expect(_getFibonacciNumbers(-1)).toEqual([]);
    });
    it('it should return an empty array if 0 is passed', () => {
      expect(_getFibonacciNumbers(0)).toEqual([]);
    });
    it('it should return an empty array if a non-integer is passed', () => {
      expect(_getFibonacciNumbers(1.1)).toEqual([]);
    });
  });

  describe('return first couple of terms', () => {
    it('it should return an array with a single bigint of 1', () => {
      expect(_getFibonacciNumbers(1)).toEqual([BigInt(1)]);
    });
    it('it should return an array with two bigints with values of 1', () => {
      expect(_getFibonacciNumbers(2)).toEqual([BigInt(1), BigInt(1)]);
    });
  });

  describe('check memoization works', () => {
    it('it should not have been memoized', () => {
      let memo = (_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'];
      expect(memo).toBeUndefined();
    });
    it('it should be equal to a bigint array with 5 terms', () => {
      const fibonacciNumbersExpected: bigint[] = [
        BigInt(1),
        BigInt(1),
        BigInt(2),
        BigInt(3),
        BigInt(5),
      ];
      expect(_getFibonacciNumbers(5)).toEqual(fibonacciNumbersExpected);
    });
    it('it should have been memoized', () => {
      const memo = (_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'];
      expect(memo).toBeDefined();
    });
    it('it should return the first five bigints in memo', () => {
      const memo = (_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'];
      expect(memo).toBeDefined();
    });
  });

  describe('check large Fibonacci numbers are returned without exceeding the maximum safe integer value', () => {
    it('it should be equal to the 50th term', () => {
      expect(_getFibonacciNumbers(50)[49]).toEqual(FIB_50_TERM);
    });
    it('it should be equal to the 100th term', () => {
      const x = _getFibonacciNumbers(100)[99];
      expect(x).toEqual(FIB_100_TERM);
    });
    it('it should be equal to the 1000th term', () => {
      expect(_getFibonacciNumbers(1000)[999]).toEqual(FIB_1000_TERM);
    });
  });
});

describe('getStatusOfPotentialFibonacciNumber fn', () => {
  describe('handle non-positive integer arguments', () => {
    it('it should return `NOT_FIB` for numberString `-1`', () => {
      expect(getStatusOfPotentialFibonacciNumber('-1')).toEqual('NOT_FIB');
    });
    it('it should return `NOT_FIB` for numberString `0`', () => {
      expect(getStatusOfPotentialFibonacciNumber('0')).toEqual('NOT_FIB');
    });
    it('it should throw an error for non-integer numbers', () => {
      expect(() => getStatusOfPotentialFibonacciNumber('1.1')).toThrowError(
        'The number entered is not an integer!'
      );
    });
    it('it should throw an error for strings', () => {
      expect(() =>
        getStatusOfPotentialFibonacciNumber('someString')
      ).toThrowError('The number entered is not an integer!');
    });

    describe('handle positive integer arguments', () => {
      it('it should return `FIB` for Fibonacci numberString `1`', () => {
        expect(getStatusOfPotentialFibonacciNumber('1')).toEqual('FIB');
      });
      it('it should return `NOT_FIB` for Fibonacci numberString `4`', () => {
        expect(getStatusOfPotentialFibonacciNumber('4')).toEqual('NOT_FIB');
      });
      it('it should return `FIB` for Fibonacci numberString equal to 1000th term', () => {
        expect(
          getStatusOfPotentialFibonacciNumber(FIB_1000_TERM.toString())
        ).toEqual('FIB');
      });
      it('it should return `EXCEEDS_LIMIT` for Fibonacci numberString equal to 100th term, with a maximum term of 99 set', () => {
        (_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'] = undefined; //
        expect(
          getStatusOfPotentialFibonacciNumber(FIB_100_TERM.toString(), 99)
        ).toEqual('EXCEEDS_LIMIT');
      });
    });
  });
});
