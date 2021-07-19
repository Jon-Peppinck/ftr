import { isListUpdateNeeded } from '../__implementations__/StopWatch.helper';

describe('isListUpdateNeeded Fn', () => {
  it('it should return false if time elapsed is 0ms', () => {
    expect(isListUpdateNeeded(0, 2)).toEqual(false);
  });
  it('it should return false if time elapsed is 1100ms and interval time is 2s', () => {
    expect(isListUpdateNeeded(0, 2)).toEqual(false);
  });
  it('it should return true if time elapsed is 2000ms and interval time is 2s', () => {
    expect(isListUpdateNeeded(2000, 2)).toEqual(true);
  });
  it('it should return true if time elapsed is 4000ms and interval time is 2s', () => {
    expect(isListUpdateNeeded(4000, 2)).toEqual(true);
  });
  it('it should return false if time elapsed is 5000ms and interval time is 2s', () => {
    expect(isListUpdateNeeded(5000, 2)).toEqual(false);
  });
});
