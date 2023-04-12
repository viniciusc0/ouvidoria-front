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

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const teste = [
    {
        id: '1',
        name: 'Caio',
        cpf: '212312121',
        role: 'admin',
        status: true
    },
    {
        id: '2',
        name: 'Vinicius',
        cpf: '1313131313',
        role: 'regular',
        status: true
    },
    {
        id: '3',
        name: 'Sharapova',
        cpf: '8888888888',
        role: 'regular',
        status: true
    },
    {
        id: '4',
        name: 'Serena Williams',
        cpf: '232323232323',
        role: 'regular',
        status: true
    },
    {
        id: '5',
        name: 'Messi',
        cpf: '10101010101',
        role: 'regular',
        status: true
    }
] as UserGetProps[];

export default function GeneralAppPage() {
    const { user } = useAuthContext();

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    // const [users, setUsers] = React.useState<UserGetProps[]>([userInitialValue]);
    const [users, setUsers] = React.useState<UserGetProps[]>(teste);


    return (
        <>
            <Head>
                <title>Usuários</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Tabela crud"
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
