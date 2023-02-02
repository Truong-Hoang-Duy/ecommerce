import { Control, FieldValues } from 'react-hook-form';
import { FormDataInput } from '../../pages/SignUpPage';

export interface PropsStyledInput {
  hasIcon?: boolean;
}

export type PropsInput = {
  name: keyof FormDataInput;
  type: 'text' | 'number' | 'email' | 'password';
  hasIcon?: boolean;
  control: Control<FormDataInput, any>;
};
