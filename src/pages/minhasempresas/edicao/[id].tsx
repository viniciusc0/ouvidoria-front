// next
import Head from 'next/head';
// @mui
import { AlertColor, Container, Grid } from '@mui/material';
// layouts
// components
import { useRouter } from 'next/router';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import React from 'react';
import BackButton from 'src/components/BackButton';
import JsonForm from 'src/components/JsonForm';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import Loading from 'src/components/Loading';
import { businessFormDataInitialValue } from 'src/utils/initialValues';
import { convertBusinessDataToBackendFormat, convertBusinessDataToFrontendFormat, removeMask } from 'src/utils/functions';
import NewEditForm from '../form/NewEditForm';
import { BusinessEntity } from '../form/businessEntity';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { IBusinessForm } from 'types/IBusiness';
import BusinessController from 'controllers/businessController';

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function Edicao() {

  const { themeStretch } = useSettingsContext();

  const [formData, setFormData] = React.useState<IBusinessForm>(businessFormDataInitialValue);
  const [noBusiness, setNoBusiness] = React.useState<boolean>(false);


  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id as string;

  const handleGetBusiness = React.useCallback(async (id: string) => {
    setLoading(true);
    const businessController = new BusinessController();
    try {
      const data = await businessController.getById(id);
      console.log(data)
      const businessConvertedData = convertBusinessDataToFrontendFormat(data);
      setFormData(businessConvertedData);

    } catch (error) {
      console.log(error)
    }

    setLoading(false);
  }, []);
  React.useEffect(() => {
    handleGetBusiness(id);
  }, [handleGetBusiness, id]);




  if (loading)
    return <Loading />


  return (
    <>
      <Head>
        <title>Edição de empresa</title> {/* titulo da pagina*/}
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BackButton />
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading={'Minhas empresas'}
            links={[
              {
                name: 'Empresas',
                href: '/minhasempresas',
              },
              { name: 'Edição' },
            ]}

          />
        </Grid>
        <NewEditForm
          schema={BusinessEntity}
          values={formData} />
      </Container>
    </>
  );
}




