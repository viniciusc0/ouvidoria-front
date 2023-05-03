// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import React from 'react'
import BackButton from 'src/components/BackButton'
import DashboardLayout from 'src/layouts/dashboard'
import { useSettingsContext } from 'src/components/settings'
import Loading from 'src/components/Loading'
import NewEditForm from '../form/NewEditForm'
import { BusinessEntity } from '../form/businessEntity'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import useSingleBusinessFetch from 'hooks/useSingleBusinessFetch'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()

    const { formData, loading } = useSingleBusinessFetch()

    if (loading) return <Loading />

    return (
        <>
            <Head>
                <title>Edição de empresa</title> {/* titulo da pagina*/}
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
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <NewEditForm schema={BusinessEntity} values={formData} />
            </Container>
        </>
    )
}
