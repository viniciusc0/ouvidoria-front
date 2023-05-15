// next
import Head from 'next/head'
// @mui
import { Button, Card, Container, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Loading from 'src/components/Loading'
import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable'
import { IDashUser, IDashUserFilter } from 'types/IDashUser'
import AccordionFilter from 'src/components/AccordionFilter'
import { dashUserFiltersInitialValue } from 'src/utils/initialValues'
import { UserFiltersFormSchema } from 'formSchemas/userFormSchema'

// ----------------------------------------------------------------------

Usuarios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Usuarios() {
    const router = useRouter()
    const { themeStretch } = useSettingsContext()

    const [userFilters, setUserFilters] = useState<IDashUserFilter>(dashUserFiltersInitialValue)

    function handleSetUserFilters(data: IDashUserFilter) {
        setUserFilters(data)
    }

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<IDashUser[]>([
        {
            name: 'Caio',
            cpf: '2030293029399',
            phone: '34479890',
            email: 'caio@caio.com',
            businesses: ['Empresa 1', 'Empresa 2', 'Empresa 3'],
        },
    ])

    // const getUsers = async () => {
    //     setLoading(true)
    //     const userController = new UserController()
    //     const users = await userController.getAll(userFilters)
    //     setUsers(users)
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    if (loading) return <Loading />

    return (
        <>
            <Card sx={{ height: '100%', padding: '14px' }}>
                <Head>
                    <title>Usuários</title>
                </Head>

                <Container maxWidth={themeStretch ? false : 'xl'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <HeaderBreadcrumbs
                                heading={'Usuários'}
                                links={[
                                    {
                                        name: 'Usuários',
                                        href: '/usuarios',
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
                                                    router.push('/usuarios/cadastro')
                                                }}
                                            >
                                                Adicionar usuário
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AccordionFilter
                                schemaForm={UserFiltersFormSchema}
                                setFilters={handleSetUserFilters}
                                formData={userFilters}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CrudTable
                                tableData={users}
                                setTableData={setUsers}
                                tableLabels={[
                                    { id: 'name', label: 'Nome' },
                                    { id: 'cpf', label: 'CPF' },
                                    { id: 'phone', label: 'Telefone' },
                                    { id: 'email', label: 'Email' },
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
