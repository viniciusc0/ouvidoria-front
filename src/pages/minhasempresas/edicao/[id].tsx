// next
import Head from 'next/head'
// @mui
import { Card, Container, Grid } from '@mui/material'
// layouts
// components
import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BackButton from 'src/components/BackButton'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { IBusiness } from 'types'
import NewEditForm from '../form/NewEditForm'
import { BusinessEntity } from '../form/businessEntity'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<IBusiness>({})
    // const { formData, loading } = useSingleBusinessFetch()

    const loadData = async id => {
        setLoading(true)
        const businessController = new BusinessController()
        const business = await businessController.getById(id)
        if (!business) {
            return
        }
        setInitialValues(business)
        setLoading(false)
    }
    useEffect(() => {
        if (query.id && Number(query.id)) {
            loadData(query.id)
        }
    }, [query.id])
    if (loading) return <Loading />

    return (
        <Card>
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
                <NewEditForm schema={BusinessEntity} values={initialValues} />
            </Container>
        </Card>
    )
}
