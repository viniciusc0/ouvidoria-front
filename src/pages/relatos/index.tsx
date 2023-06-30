// next
import Head from 'next/head'
// @mui
import { Card, Container, Grid } from '@mui/material'
import { PostController } from 'controllers/postController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IPostListing } from 'types/IPostListing'
import moment from 'moment'

// ----------------------------------------------------------------------

ReportsListing.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function ReportsListing() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()

    // const [businessFilters, setBusinessFilters] = useState<IBusinessFilter>(businessFiltersInitialValue)

    // function handleSetBusinessFilters(data: IBusinessFilter) {
    //     if (data.cnpj) {
    //         data.cnpj = removeMask(data.cnpj)
    //     }
    //     setBusinessFilters(data)
    // }

    function convertStatusText(text) {
        switch (text) {
            case 'em_progresso':
                return 'Em progresso'
            case 'novo':
                return 'Novo'
            case 'concluido':
                return 'Concluído'
            case 'cancelado':
                return 'Cancelado'
            default:
                return text
        }
    }

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<IPostListing[]>([])

    const getPosts = async () => {
        setLoading(true)
        const postController = new PostController()
        try {
            const postsData = await postController.getAll()
            //tirando os que nao tem response
            const p: IPostListing[] = postsData.data.filter(item => item.response !== 'string' && item.tenant !== null)
            p.forEach(item => {
                item.createdAt = moment(item.createdAt).format('DD/MM/YYYY')
                item.company = item.tenant.description
                item.type = item.response['tipo-denuncia'].label
                item.status = convertStatusText(item.status)
            })
            setPosts(p)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    if (loading) return <Loading />

    return (
        <>
            <Card sx={{ height: '100%', padding: '14px' }}>
                <Head>
                    <title>Relatos</title>
                </Head>

                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Relatos'}
                                links={[
                                    {
                                        name: 'Relatos',
                                        href: '/relatos',
                                    },
                                    { name: 'Lista' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <AccordionFilter
                                schemaForm={BusinessFilterFormSchema}
                                setFilters={handleSetBusinessFilters}
                                formData={businessFilters}
                            /> */}
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                clickableRow
                                tableData={posts}
                                setTableData={setPosts}
                                tableLabels={[
                                    { id: 'email', label: 'Email' },
                                    { id: 'createdAt', label: 'Data Criação' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'closedate', label: 'Data Fechamento' },
                                    { id: 'company', label: 'Empresa' },
                                    { id: 'type', label: 'Tipo de denúncia' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
