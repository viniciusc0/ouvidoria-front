import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, Card, Container, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginProps } from 'services/requests/usersAuth/types'
import { useAuthContext } from 'src/auth/useAuthContext'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function PasswordChange() {
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <Form />
                </Grid>
            </Grid>
        </Container>
    )
}

interface FormValuesProps extends LoginProps {
    afterSubmit?: string
}

function Form() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const { dispatch } = useAuthContext()

    const FormSchema = Yup.object().shape({
        password: Yup.string().required('Senha é obrigatória'),
        passwordConfirmartion: Yup.string().required('Senha é obrigatória'),
    })

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(FormSchema),
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        // const authController = new AuthController()
        // const res = await authController.login(data)
        // if (!res) {
        //     return
        // }
        // if (res.response.status == 400) {
        //     setError('afterSubmit', {
        //         ...res,
        //         message: 'Usuário ou senha incorretos ',
        //     })
        // }
    }

    return (
        <Card
            sx={{
                maxWidth: '550px',
                width: '100vw',
                padding: '50px',
                height: '100%',
                boxShadow: '1px 1px 10px #cecece',
            }}
        >
            <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                <Typography variant="h4">Mudança de senha</Typography>
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                    Digite a nova senha abaixo
                </Typography>
            </Grid>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
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
                    <RHFTextField
                        name="passwordConfirmation"
                        label="Confirmação de senha"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        edge="end"
                                    >
                                        <Iconify
                                            icon={showPasswordConfirmation ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={false}
                    sx={{
                        marginTop: '20px',
                        bgcolor: 'primary.main',
                        color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        },
                    }}
                >
                    Enviar
                </LoadingButton>
            </FormProvider>
        </Card>
    )
}
