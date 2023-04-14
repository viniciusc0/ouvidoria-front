import { useState } from 'react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, Box, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import LoginLayout from 'src/layouts/login';


// ----------------------------------------------------------------------


export default function Login() {
    const { method } = useAuthContext();

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
                {/* <Tooltip title={method} placement="left">
                    <Box
                        component="img"
                        alt={method}
                        src={`/assets/icons/auth/ic_${method}.png`}
                        sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
                    />
                </Tooltip> */}
            </Stack>
            {/* <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}
            <AuthLoginForm />
        </LoginLayout>
    );
}






type FormValuesProps = {
    email: string;
    password: string;
    afterSubmit?: string;
};

function AuthLoginForm() {
    const { login } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Esse email não é válido').required('Email é obrigatório'),
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

    const onSubmit = async (data: FormValuesProps) => {

        console.log(data);

        try {
            await login(data.email, data.password);
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
