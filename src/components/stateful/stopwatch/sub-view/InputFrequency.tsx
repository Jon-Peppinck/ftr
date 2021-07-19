import { ChangeEvent, FC, ReactElement } from 'react';
import InputComponent from '../../../user-interface/inputs/Input.component';

interface Props {
  intervalTimeInSeconds: number;
  onIntervalTimeInSecondsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputFrequencyComponent: FC<Props> = ({
  intervalTimeInSeconds,
  onIntervalTimeInSecondsChange,
}): ReactElement => {
  const handleIntervalTimeInSecondsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    onIntervalTimeInSecondsChange(e);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>
        Please input the amount of time in seconds between emitting numbers and
        their frequency:{' '}
      </span>
      <InputComponent
        type='number'
        value={intervalTimeInSeconds === 0 ? '' : intervalTimeInSeconds}
        onChange={handleIntervalTimeInSecondsChange}
      />
    </div>
  );
};

export default InputFrequencyComponent;
