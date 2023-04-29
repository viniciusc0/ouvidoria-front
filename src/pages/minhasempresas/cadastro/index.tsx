// next
import Head from 'next/head'
// @mui
import { AlertColor, Card, Container } from '@mui/material'
// layouts
// components
import { RJSFSchema, UiSchema } from '@rjsf/utils'
import { company } from 'Jsons/Forms/company'
import { useRouter } from 'next/router'
import React from 'react'
import { createCompany } from 'services/requests/company/createCompany'
import BackButton from 'src/components/BackButton'
import JsonForm from 'src/components/JsonForm'
import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard'
import { convertCompanyDataToBackendFormat } from 'src/utils/functions'
import { companyFormDataInitialValue } from 'src/utils/initialValues'

// ----------------------------------------------------------------------

Cadastro.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------
export default function Cadastro() {
    const { themeStretch } = useSettingsContext()

    const [alertMessage, setAlertMessage] = React.useState<{ type: AlertColor; message: string }>({
        type: 'success',
        message: 'none',
    })

    const [formData, setFormData] = React.useState(companyFormDataInitialValue)

    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }
    function setSnackBarMessage(message: string, type: AlertColor) {
        setOpenSnackbar(true)
        setAlertMessage({ type: type, message: message })
    }

    const schema: RJSFSchema = {
        title: 'Nova empresa',
        ...company.schema,
    }

    const uiSchema: UiSchema = company.uiSchema

    const router = useRouter()

    const onSubmit = async () => {
        // if (formData.corporate_name === '' || formData.cep === '' || formData.city === '' || formData.cnpj === '' || formData.end_working_hours === '' || formData.opening_hours === '' || formData.public_place === '' || formData.state === '' || formData.neighborhood === '' || formData.number === '' || formData.work_days.length === 0) {
        //   setSnackBarMessage('Preencha os campos obrigatórios', 'error');
        //   return;
        // }

        const companyConvertedData = convertCompanyDataToBackendFormat(formData)
        console.log(companyConvertedData)
        const res = await createCompany(companyConvertedData)
        if (res != undefined) {
            setSnackBarMessage('Cadastro efetuado com sucesso!', 'success')
            router.back()
        } else {
            setSnackBarMessage('Erro ao efetuar cadastro!', 'error')
        }
    }

    return (
        <Card>
            <Head>
                <title>Cadastro de empresa</title> {/* titulo da pagina*/}
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
        </Card>
    )
}
