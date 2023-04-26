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
import { UserGetProps } from 'services/requests/user/types';
import { userInitialValue } from 'src/utils/initialValues';
import Loading from 'src/components/Loading';
import AccordionFilter from 'src/components/AccordionFilter';
import { userFiltersJson } from 'Jsons/Forms/user';
import styled from 'styled-components';
import { listUsers } from 'services/requests/user/listUsers';

// ----------------------------------------------------------------------

Usuarios.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------


export default function Usuarios() {
    const { themeStretch } = useSettingsContext();

    const [users, setUsers] = React.useState<UserGetProps[]>([userInitialValue]);
    const [noUsers, setNoUsers] = React.useState<boolean>(false);
    

    const [loading, setLoading] = React.useState(false);

    const [userFilters, setUserFilters] = React.useState<UserGetProps>(userInitialValue);
    function handleUserFilters(data: UserGetProps) {
        setUserFilters(data);
    }


    const getUsers = React.useCallback(async () => {
        setLoading(true);
        const usersArray = await listUsers() as UserGetProps[];
        if (usersArray != undefined) {
            if (usersArray?.length != 0) {
                setNoUsers(false);
                setUsers(usersArray);
            } else {
                setNoUsers(true);
            }
        } else {
            setNoUsers(true);
        }
        setLoading(false);
    // }, [userFilters]);
    }, []);

    React.useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading)
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
                                    { id: 'username', label: 'Username' },
                                    { id: 'email', label: 'Email' },
                                    // { id: 'role', label: 'Cargo' },
                                    // { id: 'status', label: 'Status' },
                                ]}
                            />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}


