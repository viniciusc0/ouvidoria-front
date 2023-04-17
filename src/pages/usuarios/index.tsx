// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import React from 'react';
import { UserGetProps } from 'services/requests/user/interfaces';
import { userInitialValue } from 'src/utils/initialValues';
import Loading from 'src/components/Loading';
import AccordionFilter from 'src/components/AccordionFilter';
import { userFiltersJson } from 'Jsons/Forms/user';

// ----------------------------------------------------------------------

Usuarios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const teste = [
    {
        id: '1',
        name: 'Caio',
        cpf: '212312121',
        role: {
            "name": "Comum",
            "const": "regular"
        },
        status: true
    },
    {
        id: '2',
        name: 'Vinicius',
        cpf: '1313131313',
        role: {
        "name": "Comum",
        "const": "regular"
    },
        status: true
    },
    {
        id: '3',
        name: 'Sharapova',
        cpf: '8888888888',
        role: {
        "name": "Comum",
        "const": "regular"
    },
        status: true
    },
    {
        id: '4',
        name: 'Serena Williams',
        cpf: '232323232323',
        role: {
        "name": "Comum",
        "const": "regular"
    },
        status: true
    },
    {
        id: '5',
        name: 'Messi',
        cpf: '10101010101',
        role: {
            "name": "Comum",
            "const": "regular"
        },
        status: true
    }
] as UserGetProps[];

export default function Usuarios() {
    const { user } = useAuthContext();

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    // const [users, setUsers] = React.useState<UserGetProps[]>([userInitialValue]);
    const [users, setUsers] = React.useState<UserGetProps[]>(teste);

    const [loading, setLoading] = React.useState(false);

    const [userFilters, setUserFilters] = React.useState<UserGetProps>(userInitialValue);
    function handleUserFilters(data: UserGetProps){
        setUserFilters(data);
    }


    // const getUsers = React.useCallback(async () => {
    //     setLoading(true);
    //     const usersArray = await listCategoriesWithFilters(userFilters);
    //     if (usersArray != undefined) {
    //         if (usersArray?.length != 0) {
    //             setNoUsers(false);
    //             setUsers(usersArray);
    //         } else {
    //             setNoUsers(true);
    //         }
    //     } else {
    //         setNoUsers(true);
    //     }
    //     setLoading(false);
    // }, [userFilters]);

    // React.useEffect(() => {
    //     getUsers();
    // }, [getUsers]);

    if(loading)
    return <Loading />

    return (
        <>
            <Head>
                <title>Usuários</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <AccordionFilter formJson={userFiltersJson} setFilters={handleUserFilters} />
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Usuários"
                            setTableData={setUsers}
                            tableData={users}
                            tableLabels={[
                                { id: 'name', label: 'Nome' },
                                { id: 'cpf', label: 'CPF' },
                                { id: 'role', label: 'Cargo' },
                                { id: 'status', label: 'Status' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
