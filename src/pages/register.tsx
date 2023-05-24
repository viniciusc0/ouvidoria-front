import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterProps } from 'services/requests/usersAuth/types'
import { useAuthContext } from 'src/auth/useAuthContext'
import LoginLayout from 'src/layouts/login'
import * as Yup from 'yup'

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
    )
}

// ----------------------------------------------------------------------

interface FormValuesProps extends RegisterProps {
    afterSubmit?: string
}

function AuthRegisterForm() {
    const [showPassword, setShowPassword] = useState(false)

    const { registerUser } = useAuthContext()

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().required('Nome de usuário é obrigatório'),
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
    })

    const defaultValues = {
        username: '',
        email: '',
    }

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    })

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods

    const { push } = useRouter()

    const onSubmit = async (data: FormValuesProps) => {
        try {
            registerUser(data)
            push('/login')
        } catch (error) {
            console.error(error)
            setError('afterSubmit', {
                ...error,
                message: error.message,
            })
        }
    }

    return (
        <></>
        // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        //     <Stack spacing={2.5}>
        //         {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        //         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        //             <RHFTextField name="username" label="Nome de usuário" />
        //             <RHFTextField name="email" label="Email" />
        //         </Stack>

        //         <RHFTextField
        //             name="password"
        //             label="Senha"
        //             type={showPassword ? 'text' : 'password'}
        //             InputProps={{
        //                 endAdornment: (
        //                     <InputAdornment position="end">
        //                         <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
        //                             <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
        //                         </IconButton>
        //                     </InputAdornment>
        //                 ),
        //             }}
        //         />

        //         <LoadingButton
        //             fullWidth
        //             color="inherit"
        //             size="large"
        //             type="submit"
        //             variant="contained"
        //             loading={isSubmitting}
        //             sx={{
        //                 bgcolor: 'text.primary',
        //                 color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
        //                 '&:hover': {
        //                     bgcolor: 'text.primary',
        //                     color: theme => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
        //                 },
        //             }}
        //         >
        //             Criar conta
        //         </LoadingButton>
        //     </Stack>
        // </FormProvider>
    )
}
