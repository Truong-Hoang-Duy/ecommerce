import { FormDataInput } from 'pages/SignUpPage';
import { Control, FieldValues } from 'react-hook-form';

export interface PropsStyledInput {
  hasIcon?: boolean;
}

export type PropsInput = {
  name: keyof FormDataInput;
  type: 'text' | 'number' | 'email' | 'password';
  hasIcon?: boolean;
  control: Control<FormDataInput, any>;
};
