import styled from 'styled-components';
import React from 'react';

const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: bold;
  cursor: pointer;
`;

type Props = {
  htmlFor?: string;
  children: JSX.Element | string;
};

const Label: React.FC<Props & React.HTMLAttributes<HTMLLabelElement>> = ({
  htmlFor,
  children,
  ...props
}) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
