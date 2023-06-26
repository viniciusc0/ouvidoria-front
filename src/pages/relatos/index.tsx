// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import { PostController } from 'controllers/postController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IPostListing } from 'types/IPostListing'

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

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState<IPostListing[]>([])

    const getPosts = async () => {
        setLoading(true)
        const postController = new PostController()
        try {
            const postsData = await postController.getAll()
            setPosts(postsData.data)
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
                                    { id: 'protocol', label: 'Protocolo' },
                                    { id: 'email', label: 'Email' },
                                    // { id: 'status', label: 'Status' },
                                    { id: 'createdAt', label: 'Data Criação' },
                                    // { id: '', label: 'Data Fechamento' },
                                    { id: 'company', label: 'Empresa' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Card>
        </>
    )
}
