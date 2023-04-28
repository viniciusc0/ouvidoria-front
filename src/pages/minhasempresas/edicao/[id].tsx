// next
import Head from 'next/head';
// @mui
import { AlertColor, Container } from '@mui/material';
// layouts
// components
import { useRouter } from 'next/router';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import React from 'react';
import BackButton from 'src/components/BackButton';
import JsonForm from 'src/components/JsonForm';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { companyInitialValue } from 'src/utils/initialValues';
import { company } from 'Jsons/Forms/company';
import Loading from 'src/components/Loading';
import { getCompany } from 'services/requests/company/getCompany';
import { CompanyCreationProps, CompanyFormData } from 'services/requests/company/types';
import { createCompany } from 'services/requests/company/createCompany';
import { companyFormDataInitialValue } from 'src/utils/initialValues';
import { convertCompanyDataToBackendFormat, convertCompanyDataToFrontendFormat, removeMask } from 'src/utils/functions';
import { editCompany } from 'services/requests/company/editCompany';

// ----------------------------------------------------------------------

Edicao.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function Edicao() {

  const { themeStretch } = useSettingsContext();

  const [alertMessage, setAlertMessage] = React.useState<{ type: AlertColor, message: string }>({
    type: 'success',
    message: 'none',
  });

  const [formData, setFormData] = React.useState(companyFormDataInitialValue);
  const [noCompany, setNoCompany] = React.useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
  function setSnackBarMessage(message: string, type: AlertColor) {
    setOpenSnackbar(true);
    setAlertMessage({ type: type, message: message });
  }

  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id as string;
  const [addressId, setAddressId] = React.useState<string>('');

  const handleGetCompany = React.useCallback(async (id: string) => {
    setLoading(true);
    const data = await getCompany(id);
    if (data != undefined) {
      data.address.id != undefined ? setAddressId(data.address.id) : null;
      const companyConvertedData = convertCompanyDataToFrontendFormat(data);
      setFormData(companyConvertedData);
    } else {
      setNoCompany(true);
    }
    setLoading(false);
  }, []);
  React.useEffect(() => {
    handleGetCompany(id);
  }, [handleGetCompany, id]);

  const schema: RJSFSchema = {
    title: "Edição",
    ...company.schema
  };
  const uiSchema: UiSchema = company.uiSchema;


  //   const onSubmit = (formItems: IChangeEvent) => {
  const onSubmit = async () => {
    console.log(formData);
    // if (formData.corporate_name === '' || formData.cep === '' || formData.city === '' || formData.cnpj === '' || formData.end_working_hours === '' || formData.opening_hours === '' || formData.public_place === '' || formData.state === '' || formData.neighborhood === '' || formData.number === '' || formData.work_days.length === 0) {
    //   setSnackBarMessage('Preencha os campos obrigatórios', 'error');
    //   return;
    // }
    let companyConvertedData = convertCompanyDataToBackendFormat(formData);
    companyConvertedData = {
      ...companyConvertedData,
      address: {
        id: addressId,
        ...companyConvertedData.address
      }
    };
    const res = await editCompany(id, companyConvertedData);
    if (res != undefined) {
      setSnackBarMessage('Edição efetuada com sucesso!', 'success');
      router.back();
    } else {
      setSnackBarMessage('Erro ao efetuar edição!', 'error');
    }
  };

  if (loading)
    return <Loading />


  return (
    <>
      <Head>
        <title>Edição de empresa</title> {/* titulo da pagina*/}
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BackButton />
        <JsonForm
          setFormData={setFormData}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={onSubmit}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          alertMessage={alertMessage}
        />
      </Container>
    </>
  );
}




