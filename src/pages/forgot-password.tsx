import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginProps } from 'services/requests/usersAuth/types'
import { useAuthContext } from 'src/auth/useAuthContext'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function ForgotPassword() {
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
    const { dispatch } = useAuthContext()

    const FormSchema = Yup.object().shape({
        identifier: Yup.string().email('Email inválido').required('Campo email é obrigatório'),
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
        <Card sx={{ maxWidth: '550px', padding: '50px', height: '100%', boxShadow: '1px 1px 10px #cecece' }}>
            <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                <Typography variant="h4">Esqueci minha senha</Typography>
                <Typography sx={{ marginTop: '10px' }} variant="body1">
                    Para redefinir sua senha, informe o email cadastrado na sua conta e lhe enviaremos um link com as
                    instruções
                </Typography>
            </Grid>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                    <RHFTextField name="identifier" label="Digite seu email" />
                </Stack>
                <Stack alignItems="flex-end" sx={{ my: 2 }}>
                    <NextLink href={'/login'} passHref>
                        <Link variant="body2" color="inherit" underline="always">
                            Página de Login
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
                    Enviar
                </LoadingButton>
            </FormProvider>
        </Card>
    )
}
