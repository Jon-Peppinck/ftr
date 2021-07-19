import { createContext, useState } from 'react';
import FibonacciNumberHandlerComponent from './components/stateful/fibonacci-number-handler/FibonacciNumberHandler.component';
import StopWatchComponent from './components/stateful/stopwatch/StopWatch.component';

export const Context = createContext({
  timeInMsToUpdateList: 0,
  timesProgramHasBeenStarted: 0,
  timesProgramHasBeenExited: 0,
});

const App = () => {
  let [timeInMsToUpdateList, setTimeInMsToUpdateList] = useState(0);
  let [timesProgramHasBeenStarted, setTimesProgramHasBeenStarted] = useState(0);
  let [timesProgramHasBeenExited, setTimesProgramHasBeenExited] = useState(0);

  const setTimeToUpdateList = (elapsedTimeInMs: number): void => {
    setTimeInMsToUpdateList(elapsedTimeInMs);
  };

  const _setTimesProgramHasBeenStarted = (): void => {
    setTimesProgramHasBeenStarted((state) => state + 1);
  };

  const _setTimesProgramHasBeenExited = (): void => {
    setTimesProgramHasBeenExited((state) => state + 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#c9a959' }}>For The Record</h1>
      <StopWatchComponent
        updateList={setTimeToUpdateList}
        updateTimesProgramHasBeenStarted={_setTimesProgramHasBeenStarted}
        updateTimesProgramHasBeenExited={_setTimesProgramHasBeenExited}
      />
      <Context.Provider
        value={{
          timeInMsToUpdateList,
          timesProgramHasBeenStarted,
          timesProgramHasBeenExited,
        }}
      >
        <FibonacciNumberHandlerComponent />
      </Context.Provider>
    </div>
  );
};

export default App;
