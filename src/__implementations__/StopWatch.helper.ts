export const INCREMENT_TIME_IN_MS = 10;

export const isListUpdateNeeded = (
  elapsedTimeInMs: number,
  intervalTimeInSeconds: number
): boolean => {
  if (elapsedTimeInMs === 0) return false;
  let intervalTimeInMs = intervalTimeInSeconds * 1000;
  return elapsedTimeInMs % intervalTimeInMs === 0;
};

// NOTE: Since the time is rendered in the DOM every 10ms, it is more efficient to use React built in hooks - useEffect and useState - to track and update the changes smoothly to the UI. However, the following code is left here if one were to want a solid starting point for a console application. It is also a business requirement to update the list at the specified intervals, so rather than concern ourselves with trivial setters and getters of a interval, the focus is on ensuring the business requirement behaves as intended.

// let interval: ReturnType<typeof setTimeout> | null | any;
// let elapsedTimeInMs = 0;
// let isStopWatchOn = false;
// let intervalTimeInSeconds = 0;

// export const _setIntervalTimeInSeconds = (
//   _intervalTimeInSeconds: number
// ): void => {
//   if (
//     typeof _intervalTimeInSeconds !== 'number' ||
//     _intervalTimeInSeconds % 1 !== 0 ||
//     _intervalTimeInSeconds <= 0
//   )
//     return;
//   intervalTimeInSeconds = _intervalTimeInSeconds;
// };

// export const _incrementIntervalIfStopWatchIsOn = (): void => {
//   if (intervalTimeInSeconds <= 0 || intervalTimeInSeconds) return;
//   isStopWatchOn ? _setInterval() : clearInterval(interval);
// };

// export const _setInterval = (): ReturnType<typeof setTimeout> | null | any => {
//   setInterval(() => {
//     elapsedTimeInMs += INCREMENT_TIME_IN_MS;
//   }, INCREMENT_TIME_IN_MS);
// };

// export const _clearInterval = (
//   intervalId: ReturnType<typeof setTimeout> | null | any
// ): void => {
//   clearInterval(intervalId);
// };

// export const _startStopWatch = (): void => {
//   if (isStopWatchOn || elapsedTimeInMs > 0) return;
//   isStopWatchOn = true;
// };

// export const _haltStopWatch = (): void => {
//   if (!isStopWatchOn) return;
//   isStopWatchOn = false;
// };

// export const _resumeStopWatch = (): void => {
//   if (isStopWatchOn || elapsedTimeInMs === 0) return;
//   isStopWatchOn = true;
// };

// export const _resetStopWatch = (): void => {
//   if (elapsedTimeInMs === 0) return;
//   elapsedTimeInMs = 0;
// };

// export const _getElapsedTimeInMs = (): any => {
//   return elapsedTimeInMs;
// };

// export const _getIsStopWatchOn = (): boolean => {
//   return isStopWatchOn;
// };

// export const _getIntervalTimeInSeconds = (): number => {
//   return intervalTimeInSeconds;
// };
