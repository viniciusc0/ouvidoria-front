// next
import Head from 'next/head';
// @mui
import { AlertColor, Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import { useRouter } from 'next/router';
import { deliveryman } from 'Jsons/Forms/deliveryman';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import React from 'react';
import BackButton from 'src/components/BackButton';
import JsonForm from 'src/components/JsonForm';

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function Cadastro() {
  const { themeStretch } = useSettingsContext();


  const [alertMessage, setAlertMessage] = React.useState<{ type: AlertColor, message: string }>({
    type: 'success',
    message: 'none',
  });

  const [formData, setFormData] = React.useState({
    description: '',
    status: true,
    category: '',
    position: 0,
    imageUrl: ''
  });

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const schema: RJSFSchema = {
    "title": "Cadastro",
    ...deliveryman.schema
  };


  const uiSchema: UiSchema = deliveryman.uiSchema;


  const onSubmit = async (formItems: IChangeEvent) => {
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
        <title> Cadastro de entregador</title> {/* titulo da pagina*/}
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
