import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, Card, Container, Grid, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginProps } from 'services/requests/usersAuth/types'
import { AuthTypes } from 'src/auth/JwtContext'
import { useAuthContext } from 'src/auth/useAuthContext'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <AuthLoginForm />
                </Grid>
            </Grid>
        </Container>
    )
}

interface FormValuesProps extends LoginProps {
    afterSubmit?: string
}

function AuthLoginForm() {
    const [showPassword, setShowPassword] = useState(false)

    const { dispatch } = useAuthContext()

    const LoginSchema = Yup.object().shape({
        identifier: Yup.string().required('Email ou  nome de usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
    })

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        const authController = new AuthController()
        const res = await authController.login(data)
        if (!res) {
            return
        }
        if (res.response.status == 400) {
            setError('afterSubmit', {
                ...res,
                message: 'Usuário ou senha incorretos ',
            })
        }
    }

    useEffect(() => {
        dispatch({
            type: AuthTypes.LOGOUT,
        })
    }, [])

    return (
        <Card sx={{ width: '100%', padding: '50px', height: '100%', boxShadow: '1px 1px 10px #cecece' }}>
            <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                <Typography variant="h4">Mensagem de boas vindas </Typography>
                <Typography variant="body2">Slogan</Typography>
            </Grid>
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
                    <NextLink href={'/forgot-password'} passHref>
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
                    loading={false}
                    sx={{
                        bgcolor: 'primary.main',
                        color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        },
                    }}
                >
                    Login
                </LoadingButton>
            </FormProvider>
        </Card>
    )
}
