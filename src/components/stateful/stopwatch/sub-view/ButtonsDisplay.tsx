import { FC, ReactElement } from 'react';
import ButtonComponent from '../../../user-interface/buttons/Button.component';

interface Props {
  intervalTimeInSeconds: number;
  isStopWatchOn: boolean;
  elapsedTimeInMs: number;
  onIsStopWatchOnChange: (isStopWatchOn: boolean) => void;
  onElapsedTimeInMsChange: (elapsedTimeInMs: number) => void;
  onStart: () => void;
  onExit: () => void;
}

const ButtonDisplayComponent: FC<Props> = ({
  intervalTimeInSeconds,
  isStopWatchOn,
  elapsedTimeInMs,
  onIsStopWatchOnChange,
  onElapsedTimeInMsChange,
  onStart,
  onExit,
}): ReactElement => {
  const handleIsStopWatchOnChange = (isStopWatchOn: boolean) => {
    onIsStopWatchOnChange(isStopWatchOn);
  };

  const handleElapsedTimeInMsChange = (elapsedTimeInMs: number) => {
    onElapsedTimeInMsChange(elapsedTimeInMs);
  };

  const handleOnExit = () => {
    onExit();
    handleIsStopWatchOnChange(false);
    handleElapsedTimeInMsChange(0);
  };

  return (
    <div>
      <ButtonComponent
        isDisabled={
          isStopWatchOn || elapsedTimeInMs !== 0 || intervalTimeInSeconds <= 0
        }
        onClick={() => {
          onStart();
          handleIsStopWatchOnChange(true);
        }}
      >
        Start
      </ButtonComponent>

      <ButtonComponent
        isDisabled={!isStopWatchOn}
        onClick={() => handleIsStopWatchOnChange(false)}
      >
        Halt
      </ButtonComponent>

      <ButtonComponent
        isDisabled={isStopWatchOn || elapsedTimeInMs === 0}
        onClick={() => handleIsStopWatchOnChange(true)}
      >
        Resume
      </ButtonComponent>

      <ButtonComponent
        isDisabled={elapsedTimeInMs === 0}
        onClick={() => handleElapsedTimeInMsChange(0)}
      >
        Reset
      </ButtonComponent>

      <ButtonComponent
        // isDisabled={elapsedTimeInMs === 0}
        onClick={() => {
          handleOnExit();
        }}
      >
        Exit
      </ButtonComponent>
    </div>
  );
};

export default ButtonDisplayComponent;
