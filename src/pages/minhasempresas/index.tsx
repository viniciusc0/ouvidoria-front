// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import BusinessController from 'controllers/businessController'
import { BusinessFilterFormSchema } from 'formSchemas'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AccordionFilter from 'src/components/AccordionFilter'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { removeMask } from 'src/utils/functions'
import { businessFiltersInitialValue } from 'src/utils/initialValues'
import { IBusiness, IBusinessFilter } from 'types/IBusiness'

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
        try {
            const businesses = await businessControler.getAll(businessFilters)
            setBusinesses(businesses)
        } catch (error) {
            console.log(error)
        }
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
                                schemaForm={BusinessFilterFormSchema}
                                setFilters={handleSetBusinessFilters}
                                formData={businessFilters}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                tableData={businesses}
                                setTableData={setBusinesses}
                                tableLabels={[
                                    { id: 'reasonName', label: 'Razão social' },
                                    { id: 'cnpj', label: 'CNPJ' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'contactName', label: 'Contato' },
                                    { id: 'action', label: 'Ações' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
