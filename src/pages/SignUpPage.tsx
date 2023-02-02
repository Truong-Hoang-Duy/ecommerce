import { isEmpty } from '@firebase/util';
import { yupResolver } from '@hookform/resolvers/yup';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContent } from 'react-toastify';
import slugify from 'slugify';
import * as yup from 'yup';
import { Button } from '../components/button';
import Authentication from '../components/Common/Authentication';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { auth, db } from '../firebase-app/firebase-config';

export type FormDataInput = {
  fullname: string;
  email: string;
  password: string;
  title: string;
  slug: string;
  status: string | number;
  categoryId: string;
  author: string;
  image: File | string;
  image_name: string;
  hot: boolean;
  name: string;
};

const scheme = yup.object({
  fullname: yup.string().required('Please enter your fullname'),
  email: yup.string().email('Please enter valid email address').required('Please enter your email'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters or greater')
    .required('Please enter your password'),
});

const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm<FormDataInput>({
    mode: 'onChange',
    resolver: yupResolver(scheme),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        await updateProfile(auth.currentUser as User, {
          displayName: values.fullname,
        });
        await setDoc(doc(db, 'users', auth.currentUser?.uid as any), {
          name: values.fullname,
          email: values.email,
          password: values.password,
          username: slugify(values.fullname, { lower: true }),
        });
        toast.success('Register successfully');
        navigate('/sign-in');
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
    <Authentication text="Sign Up">
      <form className="form" onSubmit={onSubmit} autoComplete="off">
        <Field>
          <Label htmlFor="fullname" className="label">
            Full name
          </Label>
          <Input
            name="fullname"
            type="text"
            className="input"
            placeholder="Enter your full name"
            control={control}
          />
        </Field>

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
          You already have an account? <NavLink to="/sign-in">Login</NavLink>
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
          to=""
        >
          Submit
        </Button>
      </form>
    </Authentication>
  );
};

export default SignUpPage;
