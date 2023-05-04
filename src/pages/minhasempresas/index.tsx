// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import AccordionFilter from 'src/components/AccordionFilter'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { BusinessFiltersEntity } from './form/businessEntity'
import { removeMask } from 'src/utils/functions'
import { useEffect, useState } from 'react'
import { IBusiness, IBusinessFilter } from 'types/IBusiness'
import { businessFiltersInitialValue } from 'src/utils/initialValues'
import BusinessController from 'controllers/businessController'

// ----------------------------------------------------------------------

MinhasEmpresas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function MinhasEmpresas() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()

    const [businessFilters, setBusinessFilters] = useState<IBusinessFilter>(businessFiltersInitialValue)

    function handleSetBusinessFilters(data: IBusinessFilter) {
        if (data.cnpj) {
            data.cnpj = removeMask(data.cnpj)
        }
        setBusinessFilters(data)
    }

    const [loading, setLoading] = useState(false)
    const [businesses, setBusinesses] = useState<IBusiness[]>([])

    const getBusinesses = async () => {
        setLoading(true)
        const businessControler = new BusinessController()
        const businesses = await businessControler.getAll(businessFilters)
        setBusinesses(businesses)
        setLoading(false)
    }

    useEffect(() => {
        getBusinesses()
    }, [businessFilters])

    if (loading) return <Loading />

    return (
        <>
            <Card sx={{ height: '100%', padding: '14px' }}>
                <Head>
                    <title>Empresas</title>
                </Head>

                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Minhas empresas'}
                                links={[
                                    {
                                        name: 'Empresas',
                                        href: '/minhasempresas',
                                    },
                                    { name: 'Lista' },
                                ]}
                                action={
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                startIcon={<Iconify icon="material-symbols:add" />}
                                                onClick={() => {
                                                    router.push('/minhasempresas/cadastro')
                                                }}
                                            >
                                                Adicionar empresa
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AccordionFilter
                                schemaForm={BusinessFiltersEntity}
                                setFilters={handleSetBusinessFilters}
                                formData={businessFilters}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                // title="Empresas"
                                tableData={businesses}
                                setTableData={setBusinesses}
                                tableLabels={[
                                    { id: 'reasonName', label: 'Razão social' },
                                    { id: 'cnpj', label: 'CNPJ' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'contactName', label: 'Contato' },
                                    { id: 'action', label: 'Ações' },
                                    // { id: 'contactPhone', label: 'Telefone' },
                                    // { id: 'opening_hours', label: 'Início de expediente' },
                                    // { id: 'end_working_hours', label: 'Fim de expediente' },
                                    // { id: 'work_days', label: 'Dias de funcionamento' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
