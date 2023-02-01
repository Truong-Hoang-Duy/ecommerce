import styled from 'styled-components';
import React from 'react';
import { useController } from 'react-hook-form';
import { PropsInput, PropsStyledInput } from './types';

const InputStyles = styled.div<PropsStyledInput>`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? '16px 60px 16px 20px' : '16px 20px')};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input::-webkit-input-placeholder {
    color: #84878b;
  }
  .input::-moz-input-placeholder {
    color: #84878b;
  }
  .input-icon {
    position: absolute;
    display: flex;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #b9bdc2;
  }
`;

const Input: React.FC<PropsInput & React.HTMLAttributes<HTMLInputElement>> = ({
  name = 'fullname',
  type = 'text',
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
};

export default Input;
