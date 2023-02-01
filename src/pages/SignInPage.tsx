import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import Authentication from '../components/Common/Authentication';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { FormDataInput } from './SignUpPage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContent } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-app/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { isEmpty } from '@firebase/util';
import { useAppDispatch } from '../app/hooks';
import { authActions } from '../features/auth/authSlice';

const scheme = yup.object({
  email: yup.string().email('Please enter valid email address').required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
    watch,
    reset,
  } = useForm<FormDataInput>({
    mode: 'onChange',
    resolver: yupResolver(scheme),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        dispatch(
          authActions.login({
            username: values.email,
            password: values.password,
          })
        );
        toast.success('Log in success', {
          pauseOnHover: false,
        });
        navigate('/');
      })
      .catch(function (error) {
        const messageErr = error.code.slice(5).replace(/-/g, ' ');
        if (isEmpty(error.code) === false) {
          toast.error(messageErr.charAt(0).toUpperCase() + messageErr.slice(1), {
            pauseOnHover: false,
          });
        }
      });
  });

  useEffect(() => {
    const arrErr = Object.values(errors);
    if (arrErr.length > 0) {
      toast.error(arrErr[0].message as ToastContent<unknown>, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  return (
    <Authentication text="Sign In">
      <form className="form" onSubmit={onSubmit} autoComplete="off">
        <Field>
          <Label htmlFor="email" className="label">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            className="input"
            placeholder="Enter your email"
            control={control}
          />
        </Field>

        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <Input
            name="password"
            type={togglePassword ? 'text' : 'password'}
            className="input"
            placeholder="Enter your password"
            control={control}
          >
            {togglePassword ? (
              <VisibilityOutlined onClick={() => setTogglePassword(false)} />
            ) : (
              <VisibilityOffOutlined onClick={() => setTogglePassword(true)} />
            )}
          </Input>
        </Field>

        <div className="have-account">
          You haven't had an account? <NavLink to="/sign-up">Register an acount</NavLink>
        </div>

        <Button
          type="submit"
          onClick={() => {}}
          style={{
            maxWidth: 300,
            margin: '0 auto',
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;
