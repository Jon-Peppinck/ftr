import { FC, ReactElement } from 'react';

interface Props {
  elapsedTimeInMs: number;
}

const TimeDisplayComponent: FC<Props> = ({ elapsedTimeInMs }): ReactElement => {
  return (
    <div style={{ fontSize: '3em' }}>
      <span>
        {('0' + Math.floor((elapsedTimeInMs / 60000) % 60)).slice(-2)}:
      </span>
      <span>
        {('0' + Math.floor((elapsedTimeInMs / 1000) % 60)).slice(-2)}:
      </span>
      <span>{('0' + ((elapsedTimeInMs / 10) % 100)).slice(-2)}</span>
    </div>
  );
};

export default TimeDisplayComponent;
