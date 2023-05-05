// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import React from 'react'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import NewEditForm from '../form/NewEditForm'
import { BusinessEntity } from '../form/businessEntity'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import CustomCard from 'src/components/CustomCard'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    const { themeStretch } = useSettingsContext()

    return (
        <CustomCard>
            <Head>
                <title>Cadastro de empresa</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
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
                <Grid item xs={12}>
                    <NewEditForm schema={BusinessEntity} />
                </Grid>
            </Container>
        </CustomCard>
    )
}
