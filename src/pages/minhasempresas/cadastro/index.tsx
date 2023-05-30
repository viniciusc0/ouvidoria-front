// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import React, { useState } from 'react'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import NewEditForm from '../form/NewEditForm'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    const { themeStretch } = useSettingsContext()

    const [values, setValues] = useState()

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
                    <NewEditForm values={values} setValues={setValues} />
                </Grid>
            </Container>
        </CustomCard>
    )
}
