import { Loading } from '../loading';
import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const ButtonStyles = styled.button<{
  height?: string;
  kind?: string;
  to?: string;
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
  ${(props) =>
    props.to === '' &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `}

  ${(props) =>
    props.kind === 'secondary' &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

type PropsButton = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  to?: string;
  kind?: string;
  height?: string;
};

const Button: React.FC<PropsButton & React.HTMLAttributes<HTMLButtonElement>> = ({
  type = 'button',
  onClick = () => {},
  isLoading,
  to = '',
  children,
  kind = 'primary',
  height = '',
  ...props
}) => {
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink
        to={to}
        style={{
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles to="" type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
