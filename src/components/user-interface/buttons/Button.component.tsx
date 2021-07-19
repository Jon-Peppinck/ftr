import { ReactNode, FC } from 'react';

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

interface CSSProps {
  backgroundColor?: string;
  color?: string;
  border?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  cursor?: string;
}

const ButtonComponent: FC<Props & CSSProps> = ({
  children,
  isDisabled,
  onClick,
  backgroundColor = '#c9a959',
  color = '#ffffff',
  border = 'rounded',
  padding = '12px 10px',
  margin = '8px',
  fontSize = '1em',
  cursor = 'pointer',
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      style={{
        backgroundColor,
        color,
        border,
        padding,
        margin,
        fontSize,
        cursor,
      }}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
