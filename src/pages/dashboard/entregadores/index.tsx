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
import { DeliverymanGetProps } from 'services/requests/deliveryman/interfaces';
import { deliverymanInitialValue } from 'src/utils/initialValues';


// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

// const teste = [
//     {
//         id: '1',
//         name: 'Caio',
//         cpf: '212312121',
//         role: 'admin',
//         status: true
//     },
//     {
//         id: '2',
//         name: 'Vinicius',
//         cpf: '1313131313',
//         role: 'regular',
//         status: true
//     },
//     {
//         id: '3',
//         name: 'Sharapova',
//         cpf: '8888888888',
//         role: 'regular',
//         status: true
//     },
//     {
//         id: '4',
//         name: 'Serena Williams',
//         cpf: '232323232323',
//         role: 'regular',
//         status: true
//     },
//     {
//         id: '5',
//         name: 'Messi',
//         cpf: '10101010101',
//         role: 'regular',
//         status: true
//     }
// ] as UserGetProps[];

export default function GeneralAppPage() {

    const { themeStretch } = useSettingsContext();

    const [deliverymans, setDeliverymans] = React.useState<DeliverymanGetProps[]>([deliverymanInitialValue]);
    // const [deliverymans, setDeliverymans] = React.useState<DeliverymanGetProps[]>(teste);


    return (
        <>
            <Head>
                <title>Entregadores</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Tabela crud"
                            tableData={deliverymans}
                            tableLabels={[
                                { id: 'name', label: 'Nome' },
                                { id: 'cpf', label: 'CPF' },
                                { id: 'init_time', label: 'Horário início' },
                                { id: 'end_time', label: 'Horário fim' },
                                { id: 'work_days', label: 'Dias de trabalho' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
