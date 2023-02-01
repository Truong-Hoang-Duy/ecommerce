import { Loading } from '../loading';
import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button<{
  height?: string;
}>`
  cursor: pointer;
  padding: 0 20px;
  line-height: 1;
  color: white;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  height: ${(props) => props.height || '58px'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

type PropsButton = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<PropsButton & React.HTMLAttributes<HTMLButtonElement>> = ({
  type = 'button',
  onClick = () => {},
  isLoading,
  children,
  ...props
}) => {
  const child = !!isLoading ? <Loading></Loading> : children;

  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
