// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import React from 'react';
import { DeliverymanGetProps } from 'services/requests/deliveryman/types';
import { deliverymanInitialValue } from 'src/utils/initialValues';
import Loading from 'src/components/Loading';
import AccordionFilter from 'src/components/AccordionFilter';
import { deliverymanFiltersJson } from 'Jsons/Forms/deliveryman';
import { listDeliverymans } from 'services/requests/deliveryman/listDeliverymans';
import AddButton from 'src/components/AddButton';


// ----------------------------------------------------------------------

Entregadores.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------


export default function Entregadores() {

    const { themeStretch } = useSettingsContext();

    const [deliverymans, setDeliverymans] = React.useState<DeliverymanGetProps[]>([deliverymanInitialValue]);
    const [noDeliverymans, setNoDeliverymans] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState(false);

    const [deliverymanFilters, setDeliverymanFilters] = React.useState<DeliverymanGetProps>(deliverymanInitialValue);
    function handleDeliverymanFilters(data: DeliverymanGetProps) {
        setDeliverymanFilters(data);
    }

    const getDeliverymans = React.useCallback(async () => {
        setLoading(true);
        const response = await listDeliverymans();
        if (response != undefined) {
            const deliverymansArray = response.data as DeliverymanGetProps[];
            if (deliverymansArray?.length != 0) {
                setNoDeliverymans(false);
                setDeliverymans(deliverymansArray);
            } else {
                setNoDeliverymans(true);
            }
        } else {
            setNoDeliverymans(true);
        }
        setLoading(false);
        // }, [userFilters]);
    }, []);

    React.useEffect(() => {
        getDeliverymans();
    }, [getDeliverymans]);

    if (loading)
        return <Loading />

    return (
        <>
            <Head>
                <title>Entregadores</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <AccordionFilter schemaForm={deliverymanFiltersJson} setFilters={handleDeliverymanFilters} />
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
