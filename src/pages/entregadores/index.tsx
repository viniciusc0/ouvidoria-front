// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import React from 'react';
import { DeliverymanGetProps } from 'services/requests/deliveryman/interfaces';
import { deliverymanInitialValue } from 'src/utils/initialValues';
import Loading from 'src/components/Loading';


// ----------------------------------------------------------------------

Entregadores.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const teste = [
    {
        id: '1',
        name: 'Entregador 1',
        cpf: '11111111111',
        init_time: '08:00',
        end_time: '18:00',
        work_days: ["Segunda", "Terça", "Quarta"]
    },
    {
        id: '2',
        name: 'Entregador 2',
        cpf: '222222222222',
        init_time: '08:00',
        end_time: '18:00',
        work_days: ["Segunda", "Terça", "Quarta"]
    },
    {
        id: '3',
        name: 'Entregador 3',
        cpf: '333333333333',
        init_time: '08:00',
        end_time: '18:00',
        work_days: ["Segunda", "Terça", "Quarta", "Quinta"]
    },
    {
        id: '4',
        name: 'Entregador 4',
        cpf: '4444444444444',
        init_time: '08:00',
        end_time: '18:00',
        work_days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
    },
    {
        id: '5',
        name: 'Entregador 5',
        cpf: '5555555555555',
        init_time: '08:00',
        end_time: '18:00',
        work_days: ["Segunda", "Terça", "Quarta"]
    }
] as DeliverymanGetProps[];

export default function Entregadores() {

    const { themeStretch } = useSettingsContext();

    // const [deliverymans, setDeliverymans] = React.useState<DeliverymanGetProps[]>([deliverymanInitialValue]);
    const [deliverymans, setDeliverymans] = React.useState<DeliverymanGetProps[]>(teste);

    const [loading, setLoading] = React.useState(false);

    if(loading)
    return <Loading />

    return (
        <>
            <Head>
                <title>Entregadores</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Entregadores"
                            tableData={deliverymans}
                            setTableData={setDeliverymans}
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
