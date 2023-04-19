import NextLink from 'next/link';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, Link, Alert, InputAdornment, IconButton } from '@mui/material';
import LoginLayout from 'src/layouts/login';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';

//

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Cadastro</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Já possui uma conta?</Typography>
          <NextLink href={'/login'} passHref>
            <Link variant="subtitle2">Faça login</Link>
          </NextLink>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {' and '}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

    </LoginLayout>
  );
}





// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
};

function AuthRegisterForm() {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (register) {
        await register(data.email, data.password, data.firstName, data.lastName);
      }
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Nome" />
          <RHFTextField name="lastName" label="Sobrenome" />
        </Stack>

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Criar conta
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}