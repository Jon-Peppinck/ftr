import { FC, ReactElement, useContext, useEffect, useState } from 'react';

import ButtonComponent from '../../user-interface/buttons/Button.component';
import InputComponent from '../../user-interface/inputs/Input.component';
import { Context } from '../../../App';

import { getStatusOfPotentialFibonacciNumber } from '../../../__implementations__/FibonacciNumberHandler.helper';
import { ObjectKeysAndFrequency } from '../../../__implementations__/models/ObjectKeysAndFrequency.interface';
import {
  doesStringContainOnlyNumbers,
  insertNumberByKeyWithFrequencyValue,
  sortObjectByValueDescending,
} from '../../../__implementations__/FibonacciNumberHandler_Display.helper';

const FibonacciNumberHandlerComponent: FC = (): ReactElement => {
  const [numberStringToInsert, setNumberStringToInsert] = useState('');
  const [insertedNumbersFrequency, setInsertedNumbersFrequency] =
    useState<ObjectKeysAndFrequency>({});

  const [displayNumbers, setDisplayNumbers] = useState(
    [] as [string, number][]
  );

  const [hasBeenRecentlyStarted, setHasBeenRecentlyStarted] = useState<
    boolean | undefined
  >(undefined);
  const [hasBeenRecentlyExited, setHasBeenRecentlyExited] = useState<
    boolean | undefined
  >(undefined);

  const {
    timeInMsToUpdateList,
    timesProgramHasBeenStarted,
    timesProgramHasBeenExited,
  } = useContext(Context);

  useEffect(() => {
    if (timeInMsToUpdateList > 0) {
      const sortedTuple = sortObjectByValueDescending(insertedNumbersFrequency);
      setDisplayNumbers(sortedTuple);
    }
  }, [timeInMsToUpdateList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNumberStringToInsert('');
    setInsertedNumbersFrequency({});
    setDisplayNumbers([]);
    if (timesProgramHasBeenStarted > 0) {
      setHasBeenRecentlyStarted(true);
      setHasBeenRecentlyExited(false);
    }
  }, [timesProgramHasBeenStarted]);

  useEffect(() => {
    if (timesProgramHasBeenExited > 0) {
      setHasBeenRecentlyExited(true);
      setHasBeenRecentlyStarted(false);
      const sortedTuple = sortObjectByValueDescending(insertedNumbersFrequency);
      setDisplayNumbers(sortedTuple);
    }
  }, [timesProgramHasBeenExited]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '710px' }}
    >
      {hasBeenRecentlyStarted && (
        <div>
          Please enter the{' '}
          {Object.keys(insertedNumbersFrequency)[0]
            ? 'next number'
            : 'first number'}
        </div>
      )}
      {!hasBeenRecentlyStarted && (
        <div>*Please specify the time in seconds in the field above</div>
      )}
      <div>
        Note: Clicking add will display the frequency of any number that has
        been inputted below.
      </div>
      <InputComponent
        type='text'
        // isDisabled={timesProgramHasBeenStarted === 0 || hasBeenRecentlyExited }
        value={numberStringToInsert}
        isDisabled={!hasBeenRecentlyStarted}
        onChange={(e) => {
          const _doesStringContainOnlyNumbers = doesStringContainOnlyNumbers(
            e.target.value
          );
          if (_doesStringContainOnlyNumbers || e.target.value === '') {
            setNumberStringToInsert(e.target.value);
          }
        }}
      />
      <ButtonComponent
        isDisabled={numberStringToInsert.length === 0}
        onClick={() => {
          setInsertedNumbersFrequency(
            (insertedNumbersFrequencyState: ObjectKeysAndFrequency) => {
              return insertNumberByKeyWithFrequencyValue(
                +numberStringToInsert,
                insertedNumbersFrequencyState
              );
            }
          );
          setNumberStringToInsert('');
        }}
      >
        Add
      </ButtonComponent>
      {!hasBeenRecentlyExited && (
        <div>
          Status:{' '}
          {numberStringToInsert.length === 0
            ? 'Please enter a number'
            : getStatusOfPotentialFibonacciNumber(numberStringToInsert)}
        </div>
      )}
      {hasBeenRecentlyExited && (
        <div>
          Thanks for playing, please fill in the input above if you would like
          to play again.
        </div>
      )}
      {displayNumbers.length > 0 && (
        <div>
          <div
            style={{
              margin: '16px 0',
              textTransform: 'uppercase',
              color: '#c9a959',
            }}
          >
            {hasBeenRecentlyExited ? 'Your final ' : ''}Entered numbers:{' '}
          </div>
          {displayNumbers.map(([key, value], index) => (
            <span key={key}>
              {key}: {value}
              {index !== displayNumbers.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FibonacciNumberHandlerComponent;
