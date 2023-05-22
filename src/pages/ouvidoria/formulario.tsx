import { Grid } from '@mui/material'
import TenantController from 'controllers/tenantController'
import { OuvidoriaFormSchema } from 'formSchemas/ouvidoriaFormSchema'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import JsonForm from 'src/components/ouvidoria/JsonForm'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import TermosAceite from 'src/components/ouvidoria/TermoAceite'
import { ICompanyInfo } from 'types/ICompanyInfo'
import { ISchemaForm } from 'types/ISchemaForm'

const Form = ({ values }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [schema, setSchema] = useState<ISchemaForm[]>(OuvidoriaFormSchema)

    const onSubmit = async data => {
        console.log(data)
    }
    const [termAccepted, setTermAccepted] = useState(false)

    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!router.isReady) return

        const getInfo = async () => {
            setLoading(true)
            const tenantController = new TenantController()
            try {
                if (typeof company === 'string') {
                    const data = await tenantController.getBasicInformation(company)
                    setCompanyInfo(data)
                } else {
                    throw Error('invalid company')
                }
                setNoCompany(false)
            } catch (error) {
                setNoCompany(true)
            }
            setLoading(false)
        }
        getInfo()

        if (Cookies.get('termoAceito') === 'sim') {
            setTermAccepted(true)
        }
    }, [router.isReady])

    if (loading) return <Loading />

    if (noCompany) return <NoCompany />

    if (!termAccepted) {
        return (
            <>
                <AppBar logoUrl={companyInfo?.logo.url as string} />
                <TermosAceite setTermAccepted={setTermAccepted} />
            </>
        )
    }

    return (
        <>
            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Grid container>
                <Grid item lg={8} xs={12} sx={{ margin: '30px auto' }}>
                    <JsonForm
                        schemaForm={schema}
                        values={values}
                        onSubmit={onSubmit}
                        msgSuccess={'Oba! Salvo com sucesso'}
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default Form
