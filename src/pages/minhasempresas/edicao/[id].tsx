// next
import Head from 'next/head'
// @mui
import { Container, Grid } from '@mui/material'
// layouts
// components
import BusinessController from 'controllers/businessController'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CustomCard from 'src/components/CustomCard'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { businessFormDataInitialValue } from 'src/utils/initialValues'
import { IBusinessFormData } from 'types/IBusiness'
import NewEditForm from '../form/NewEditForm'

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Edicao() {
    const { themeStretch } = useSettingsContext()
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState<IBusinessFormData>(businessFormDataInitialValue)

    const loadData = async id => {
        setLoading(true)
        const businessController = new BusinessController()
        const business = await businessController.getById(id)
        if (!business) {
            return
        }
        const businessFormData: IBusinessFormData = {
            ...business,
            cep: business.address!.cep,
            street: business.address!.street,
            district: business.address!.district,
            number: business.address!.number,
            complement: business.address!.complement,
            city: business.address!.city,
            uf: business.address!.uf,
        }
        setInitialValues(businessFormData)
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
                <title>Edição de empresa</title>
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
                            { name: 'Edição' },
                        ]}
                    />
                </Grid>
                <NewEditForm values={initialValues} />
            </Container>
        </CustomCard>
    )
}
