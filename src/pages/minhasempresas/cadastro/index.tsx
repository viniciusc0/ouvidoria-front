// next
import Head from 'next/head'
// @mui
import { Card, Container, Grid } from '@mui/material'
// layouts
// components
import React from 'react'
import BackButton from 'src/components/BackButton'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import NewEditForm from '../form/NewEditForm'
import { BusinessEntity } from '../form/businessEntity'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    const { themeStretch } = useSettingsContext()

    return (
        <Card>
            <Head>
                <title>Cadastro de empresa</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <BackButton />
                <Grid item xs={12}>
                    <HeaderBreadcrumbs
                        heading={'Minhas empresas'}
                        links={[
                            {
                                name: 'Empresas',
                                href: '/minhasempresas',
                            },
                            { name: 'Cadastro' },
                        ]}
                    />
                </Grid>
                <NewEditForm schema={BusinessEntity} />
            </Container>
        </Card>
    )
}
