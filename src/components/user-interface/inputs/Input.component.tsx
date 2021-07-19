import { FC, ChangeEvent } from 'react';

interface Props {
  type: string;
  value: any;
  isDisabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface CSSProps {
  padding?: string;
  margin?: string;
}

const InputComponent: FC<Props & CSSProps> = ({
  type,
  value,
  isDisabled,
  onChange,
  padding = '12px 20px',
  margin = '8px 0',
}) => {
  return (
    <input
      disabled={isDisabled}
      type={type}
      value={value}
      onChange={onChange}
      style={{ padding, margin }}
    />
  );
};

export default InputComponent;
