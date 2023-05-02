// next
import Head from 'next/head'
// @mui
import { AlertColor, Card, Container, Grid } from '@mui/material'
// layouts
// components
import { company } from 'Jsons/Forms/company'
import { useRouter } from 'next/router'
import React from 'react'
import { createCompany } from 'services/requests/company/createCompany'
import BackButton from 'src/components/BackButton'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { convertBusinessDataToBackendFormat } from 'src/utils/functions'
import { businessFormDataInitialValue } from 'src/utils/initialValues'
import NewEditForm from '../form/NewEditForm'
import { BusinessEntity } from '../form/businessEntity'
import { useSnackbar } from 'notistack'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    const { themeStretch } = useSettingsContext();


    return (
        <Card>
            <Head>
                <title>Cadastro de empresa</title> {/* titulo da pagina*/}
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
