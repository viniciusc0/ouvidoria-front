import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, Card, Container, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import { INewPassword } from 'types/IAuth'
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

interface FormValuesProps extends INewPassword {
    afterSubmit?: string
}

function Form() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const { register } = useForm()

    const FormSchema = Yup.object().shape({
        password: Yup.string().required('Senha é obrigatória'),
        passwordConfirmation: Yup.string().required('Confirmação de senha é obrigatória'),
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

    const router = useRouter()
    const { code } = router.query

    const [successMessage, setSuccessMessage] = useState(false)

    const onSubmit = async (data: FormValuesProps) => {
        if (typeof code === 'string') {
            data = { ...data, code: code }
        }
        const authController = new AuthController()
        try {
            await authController.changePassword(data)
            setSuccessMessage(true)
            router.push('/login')
        } catch (error) {
            setSuccessMessage(false)
            setError('afterSubmit', {
                message: 'Erro ao resetar senha',
            })
        }
    }

    function arePasswordsEqual() {
        return password === passwordConfirmation
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
                    {!errors.afterSubmit && successMessage && (
                        <Alert severity="success">Senha alterada com sucesso!</Alert>
                    )}
                    <Controller
                        name="password"
                        render={({ field }) => (
                            <RHFTextField
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
                                {...field}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    field.onChange(e)
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <RHFTextField
                                label="Confirmação de senha"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                edge="end"
                                            >
                                                <Iconify
                                                    icon={
                                                        showPasswordConfirmation ? 'eva:eye-fill' : 'eva:eye-off-fill'
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                {...field}
                                onChange={e => {
                                    setPasswordConfirmation(e.target.value)
                                    field.onChange(e)
                                }}
                            />
                        )}
                    />
                </Stack>
                <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={!arePasswordsEqual()}
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
                    {arePasswordsEqual() ? 'Enviar' : 'As senhas não coincidem'}
                </LoadingButton>
            </FormProvider>
        </Card>
    )
}
