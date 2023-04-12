// next
import Head from 'next/head';
// @mui
import { AlertColor, Container } from '@mui/material';
// layouts
// components
import { useRouter } from 'next/router';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import React from 'react';
import BackButton from 'src/components/BackButton';
import JsonForm from 'src/components/JsonForm';
import { user } from 'Jsons/Forms/user';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { userInitialValue } from 'src/utils/initialValues';

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function Cadastro() {
  const { themeStretch } = useSettingsContext();


  const [alertMessage, setAlertMessage] = React.useState<{ type: AlertColor, message: string }>({
    type: 'success',
    message: 'none',
  });

  const [formData, setFormData] = React.useState([userInitialValue]);

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const schema: RJSFSchema = {
    title: "Cadastro",
    ...user.schema
  };


  const uiSchema: UiSchema = user.uiSchema;


//   const onSubmit = (formItems: IChangeEvent) => {
  const onSubmit = () => {
      console.log(formData)
    //   const data = formItems.formData as CategoryCreationProps;
    //   if(data.description !== '' && data.imageUrl !== '' && data.position !== ''){
    //     const res = await createCategory(data);
    //     if(res.data != undefined){
    //       setAlertMessage({type: 'success', message: 'Cadastro efetuado com sucesso!'});
    //       setOpenSnackbar(true);
    //       router.back();
    //     }else{
    //       setAlertMessage({type: 'error', message: 'Erro ao efetuar cadastro!'});
    //       setOpenSnackbar(true);
    //     }
    //   }
  };



  return (
    <>
      <Head>
        <title> Cadastro de usuário</title> {/* titulo da pagina*/}
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
