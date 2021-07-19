import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import {
  INCREMENT_TIME_IN_MS,
  isListUpdateNeeded,
} from '../../../__implementations__/StopWatch.helper';

import ButtonDisplayComponent from './sub-view/ButtonsDisplay';
import InputFrequencyComponent from './sub-view/InputFrequency';
import TimeDisplayComponent from './sub-view/TimeDisplay';

interface Props {
  updateList: (elapsedTimeInMs: number) => void;
  updateTimesProgramHasBeenStarted: () => void;
  updateTimesProgramHasBeenExited: () => void;
}

const StopWatchComponent: FC<Props> = ({
  updateList,
  updateTimesProgramHasBeenStarted,
  updateTimesProgramHasBeenExited,
}): ReactElement => {
  let [isStopWatchOn, setIsStopWatchOn] = useState(false);
  let [intervalTimeInSeconds, setIntervalTimeInSeconds] = useState(0);
  let [elapsedTimeInMs, setElapsedTimeInMs] = useState(0);

  let interval: ReturnType<typeof setTimeout> | null | any = null;

  useEffect(() => {
    if (intervalTimeInSeconds === 0) return;

    if (isStopWatchOn) {
      interval = setInterval(() => {
        setElapsedTimeInMs(
          (elapsedTimeInMs) => elapsedTimeInMs + INCREMENT_TIME_IN_MS
        );
      }, INCREMENT_TIME_IN_MS);
    } else {
      clearInterval(interval);
    }

    if (isListUpdateNeeded(elapsedTimeInMs, intervalTimeInSeconds)) {
      updateList(elapsedTimeInMs);
    }

    return () => clearInterval(interval);
  }, [isStopWatchOn, intervalTimeInSeconds, elapsedTimeInMs, updateList]);

  const handleIntervalTimeInSecondsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIntervalTimeInSeconds(+e.target.value);
  };

  const handleIsStopWatchOnChange = (isStopWatchOn: boolean) => {
    setIsStopWatchOn(isStopWatchOn);
  };

  const handleElapsedTimeInMsChange = (elapsedTimeInMs: number) => {
    setElapsedTimeInMs(elapsedTimeInMs);
  };

  const handleStart = () => {
    updateTimesProgramHasBeenStarted();
  };

  const handleExit = () => {
    setIntervalTimeInSeconds(0);
    updateTimesProgramHasBeenExited();
  };

  return (
    <div>
      <InputFrequencyComponent
        intervalTimeInSeconds={intervalTimeInSeconds}
        onIntervalTimeInSecondsChange={handleIntervalTimeInSecondsChange}
      />
      <div className='section-border'>
        <TimeDisplayComponent elapsedTimeInMs={elapsedTimeInMs} />

        <ButtonDisplayComponent
          intervalTimeInSeconds={intervalTimeInSeconds}
          isStopWatchOn={isStopWatchOn}
          elapsedTimeInMs={elapsedTimeInMs}
          onIsStopWatchOnChange={handleIsStopWatchOnChange}
          onElapsedTimeInMsChange={handleElapsedTimeInMsChange}
          onStart={handleStart}
          onExit={handleExit}
        />
      </div>
    </div>
  );
};

export default StopWatchComponent;
