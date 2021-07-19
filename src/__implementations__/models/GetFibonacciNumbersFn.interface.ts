export interface GetFibonacciNumbersFn {
  (largestTerm: number): bigint[];
  memo: bigint[] | undefined;
}
