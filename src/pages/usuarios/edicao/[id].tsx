// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
import UserController from 'controllers/userController'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { IDashUser } from 'types/IDashUser'
import NewEditForm from '../form/NewEditForm'
import { useSnackbar } from 'notistack'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar()
    const [initialValues, setInitialValues] = useState<IDashUser>()

    const loadData = async id => {
        setLoading(true)
        const userController = new UserController()
        const user = await userController.getById(id)
        if (!user) {
            enqueueSnackbar('Falha ao carregar dados do usuário', { variant: 'error', autoHideDuration: null })
            return
        }
        setInitialValues(user)
        setLoading(false)
    }
    useEffect(() => {
        if (query.id && Number(query.id)) {
            loadData(query.id)
        }
    }, [query.id])
    if (loading) return <Loading />

    return (
        <CustomCard>
            <Head>
                <title>Edição de usuário</title>
            </Head>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Usuários'}
                        links={[
                            {
                                name: 'Usuários',
                                href: '/usuarios',
                            },
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <NewEditForm values={initialValues} />
            </Container>
        </CustomCard>
    )
}
