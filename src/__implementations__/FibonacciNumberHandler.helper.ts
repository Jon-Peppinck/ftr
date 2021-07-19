import { GetFibonacciNumbersFn } from './models/GetFibonacciNumbersFn.interface';
import { StatusOfFibonacciNumber } from './models/StatusOfFibonacciNumber';

const LARGEST_FIBONACCI_TERM = 1000;

// Runs in O(n), more efficient than recursive O(2^n), even with memoization
// Proof: https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e
export const _getFibonacciNumbers = (largestTerm: number): bigint[] => {
  if (
    typeof largestTerm !== 'number' ||
    largestTerm % 1 !== 0 ||
    largestTerm <= 0
  )
    return [];

  if (largestTerm === 1) return [BigInt(1)];
  if (largestTerm === 2) return [BigInt(1), BigInt(1)];

  let memo = (_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'];
  if (memo && memo.length >= largestTerm) return [...memo];

  let previous, current, next: bigint;
  let fibonacciNumbers: bigint[] = [];

  if (!memo) {
    previous = BigInt(0);
    current = BigInt(1);
    next = BigInt(1);
    fibonacciNumbers[0] = BigInt(1);
  } else {
    previous = memo[memo.length - 2];
    current = memo[memo.length - 1];
    fibonacciNumbers = [...memo];
  }

  for (let index = fibonacciNumbers.length; index < largestTerm; index++) {
    next = current + previous;
    previous = current;
    current = next;
    fibonacciNumbers.push(current);
  }

  return ((_getFibonacciNumbers as GetFibonacciNumbersFn)['memo'] = [
    ...fibonacciNumbers,
  ]);
};

export const getStatusOfPotentialFibonacciNumber = (
  numberString: string,
  largestTerm: number = LARGEST_FIBONACCI_TERM
): StatusOfFibonacciNumber => {
  // TODO: if largest term < 2 => handle
  if (typeof +numberString !== 'number' || +numberString % 1 !== 0)
    throw new Error('The number entered is not an integer!');

  const fibonacciNumbers = _getFibonacciNumbers(largestTerm); // memoized

  const lastFibonacciNumber = fibonacciNumbers[fibonacciNumbers.length - 1];
  if (BigInt(numberString) > lastFibonacciNumber) return 'EXCEEDS_LIMIT';

  return fibonacciNumbers.includes(BigInt(numberString)) ? 'FIB' : 'NOT_FIB';
};
