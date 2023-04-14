// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material'
import CrudTable from 'src/sections/@dashboard/general/app/CrudTable';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import React from 'react';
import { companyInitialValue } from 'src/utils/initialValues';
import { CompanyGetProps } from 'services/requests/company/interfaces';
import Loading from 'src/components/Loading';


// ----------------------------------------------------------------------

MinhasEmpresas.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const teste = [
    {
        id: '0',
        corporate_name: 'razão social',
        commercial_name: 'empresa z',
        cnpj: '909009099090',
        status: true,
        opening_hours: '08:00',
        end_working_hours: '21:00',
        work_days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        cep: '31907075',
        public_place: 'Rua cianoco',
        number: '287',
        neighboorhood: 'Vitória',
        city: 'Belo Horizonte',
        state: 'Minas Gerais'
    },
    {
        id: '1',
        corporate_name: 'razão social 2',
        commercial_name: 'empresa x',
        cnpj: '909009099090',
        status: true,
        opening_hours: '08:00',
        end_working_hours: '21:00',
        work_days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        cep: '31907075',
        public_place: 'Rua Thomé',
        number: '143',
        neighboorhood: 'Cidade Nova',
        city: 'Belo Horizonte',
        state: 'Minas Gerais'
    },
    {
        id: '2',
        corporate_name: 'razão social 3',
        commercial_name: 'empresa y',
        cnpj: '909009099090',
        status: true,
        opening_hours: '08:00',
        end_working_hours: '21:00',
        work_days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
        cep: '31907075',
        public_place: 'Rua wilaon',
        number: '354',
        neighboorhood: 'Goiania',
        city: 'Belo Horizonte',
        state: 'Minas Gerais'
    }
] as CompanyGetProps[];

export default function MinhasEmpresas() {

    const { themeStretch } = useSettingsContext();

    const [companies, setCompanies] = React.useState<CompanyGetProps[]>(teste);
    // const [companies, setCompanies] = React.useState<CompanyGetProps[]>([companyInitialValue]);

    const [loading, setLoading] = React.useState(false);

    if(loading)
    return <Loading />

    return (
        <>
            <Head>
                <title>Empresas</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <CrudTable
                            title="Empresas"
                            tableData={companies}
                            setTableData={setCompanies}
                            tableLabels={[
                                { id: 'corporate_name', label: 'Razão social' },
                                { id: 'commercial_name', label: 'Nome comercial' },
                                { id: 'cnpj', label: 'CNPJ' },
                                { id: 'status', label: 'Status' },
                                { id: 'opening_hours', label: 'Início de expediente' },
                                { id: 'end_working_hours', label: 'Fim de expediente' },
                                { id: 'work_days', label: 'Dias de funcionamento' },
                                { id: 'cep', label: 'CEP' },
                                { id: 'public_place', label: 'Logradouro' },
                                { id: 'number', label: 'Número' },
                                { id: 'neighborhood', label: 'Bairro' },
                                { id: 'city', label: 'Cidade' },
                                { id: 'state', label: 'Estado' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
