// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import React from 'react';
import { companyFiltersInitialValue, companyInitialValue } from 'src/utils/initialValues';
import { CompanyFiltersProps, CompanyGetProps } from 'services/requests/company/types';
import Loading from 'src/components/Loading';
import AccordionFilter from 'src/components/AccordionFilter';
import { companyFiltersJson } from 'Jsons/Forms/company';
import { listCompanies } from 'services/requests/company/listCompanies';


// ----------------------------------------------------------------------

MinhasEmpresas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------



export default function MinhasEmpresas() {

    const { themeStretch } = useSettingsContext();

    const [companies, setCompanies] = React.useState<CompanyGetProps[]>([companyInitialValue]);
    const [noCompanies, setNoCompanies] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState(false);

    const [companyFilters, setUserFilters] = React.useState<CompanyFiltersProps>(companyFiltersInitialValue);
    function handleCompaniesFilters(data: CompanyFiltersProps) {
        setUserFilters(data);
    }


    const getCompanies = React.useCallback(async () => {
        setLoading(true);
        const response = await listCompanies();
        const companiesArray = response.data as CompanyGetProps[];
        console.log(companiesArray)
        if (companiesArray != undefined) {
            if (companiesArray?.length != 0) {
                setNoCompanies(false);
                setCompanies(companiesArray);
            } else {
                setNoCompanies(true);
            }
        } else {
            setNoCompanies(true);
        }
        setLoading(false);
        // }, [companyFilters]);
    }, []);

    React.useEffect(() => {
        getCompanies();
    }, [getCompanies]);

    if (loading)
        return <Loading />

    return (
        <>
            <Head>
                <title>Empresas</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <AccordionFilter formJson={companyFiltersJson} setFilters={handleCompaniesFilters} />
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Empresas"
                            tableData={companies}
                            setTableData={setCompanies}
                            tableLabels={[
                                { id: 'commercial_name', label: 'Nome comercial' },
                                { id: 'corporate_name', label: 'Razão social' },
                                { id: 'cnpj', label: 'CNPJ' },
                                { id: 'status', label: 'Status' },
                                { id: 'contactName', label: 'Contato' },
                                { id: 'contactPhone', label: 'Telefone' },
                                // { id: 'opening_hours', label: 'Início de expediente' },
                                // { id: 'end_working_hours', label: 'Fim de expediente' },
                                // { id: 'work_days', label: 'Dias de funcionamento' },

                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
