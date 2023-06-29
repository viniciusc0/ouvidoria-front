import { Alert, Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import AuthController from 'controllers/authController'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { LoginProps } from 'services/requests/usersAuth/types'
import { AuthTypes } from 'src/auth/JwtContext'
import { useAuthContext } from 'src/auth/useAuthContext'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import { Imessage } from 'types/Imessage'

// ----------------------------------------------------------------------

export default function Login() {
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Head>
                <title>Login</title>
            </Head>

            <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                    <AuthLoginForm />
                </Grid>
            </Grid>
        </Container>
    )
}

function AuthLoginForm() {
    const [message, setMesssage] = useState<Imessage | null>(null)

    const onSubmit = async (data: LoginProps) => {
        const authController = new AuthController()
        try {
            await authController.login(data)
        } catch (error) {
            setMesssage({ text: 'Usuário e/ou senha incorretos', severity: 'error' })
        }
    }

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'identifier',
            label: 'E-mail',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.TEXT,

            required: true,
        },
        {
            name: 'password',
            label: 'Senha',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.PASSWORD,

            required: true,
        },
    ]

    return (
        <Card sx={{ width: '100%', height: '100%', boxShadow: '1px 1px 10px #cecece' }}>
            <Grid p={3}>
                <Grid item sx={{ textAlign: 'center', padding: '20px 0' }}>
                    <Typography variant="h4">Bem vindo ao Lorem ipsum</Typography>
                    <Typography variant="body2">Lorem ipsum</Typography>
                </Grid>

                <Stack spacing={3}>{message && <Alert severity={message.severity}>{message.text}</Alert>}</Stack>

                <Stack spacing={3}>
                    <ApolloForm
                        schema={formSchema}
                        onSubmit={onSubmit}
                        submitButtonText="Login"
                        defaultExpandedGroup={false}
                    />
                </Stack>

                <Stack alignItems="flex-end" sx={{ mt: 2 }}>
                    <NextLink href={'/forgot-password'} passHref>
                        <Link variant="body2" color="inherit" underline="always">
                            Esqueceu sua senha?
                        </Link>
                    </NextLink>
                </Stack>
            </Grid>
        </Card>
    )
}
