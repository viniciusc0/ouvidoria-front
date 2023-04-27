import { useState } from 'react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, Box, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import LoginLayout from 'src/layouts/login';
import { login } from 'services/requests/usersAuth/login';
import { LoginProps } from 'services/requests/usersAuth/types';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


// ----------------------------------------------------------------------


export default function Login() {

    return (
        <LoginLayout>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant="h4">Entre no LatLong</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">Novo usuário?</Typography>
                    <NextLink href={'/register'} passHref>
                        <Link variant="subtitle2">Crie uma conta</Link>
                    </NextLink>
                </Stack>
            </Stack>
            {/* <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}
            <AuthLoginForm />
        </LoginLayout>
    );
}






interface FormValuesProps extends LoginProps {
    afterSubmit?: string;
};

function AuthLoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        identifier: Yup.string().required('Email ou  nome de usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const router = useRouter();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            const response = await login(data);
            if (response != undefined) {
                Cookies.set("token", response?.jwt, { expires: 2 });
                router.push('/');
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
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField name="identifier" label="Email" />

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
            </Stack>

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
                <NextLink href={'/login'} passHref>
                    <Link variant="body2" color="inherit" underline="always">
                        Esqueceu sua senha?
                    </Link>
                </NextLink>
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitSuccessful || isSubmitting}
                sx={{
                    bgcolor: 'text.primary',
                    color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    '&:hover': {
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                    },
                }}
            >
                Login
            </LoadingButton>
        </FormProvider>
    );
}
