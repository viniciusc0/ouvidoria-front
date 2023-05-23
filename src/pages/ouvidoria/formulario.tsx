import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import TenantController from 'controllers/tenantController'
import { OuvidoriaFormSchema } from 'formSchemas/ouvidoriaFormSchema'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import ApolloForm, {
    ApolloFormSchemaComponentType,
    ApolloFormSchemaGroup,
    ApolloFormSchemaItem,
} from 'src/components/apollo-form/ApolloForm.component'
import AppBar from 'src/components/ouvidoria/AppBar'
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
    const [checkIdentification, setCheckIdentification] = useState<string>('')
    const [initialValues, setInitialValues] = useState<any>([])

    const groups: ApolloFormSchemaGroup[] = [
        {
            name: 'Identificação',
            key: 'identification',
            type: 'label',
            variant: 'h5',
        },
        {
            name: 'Dados pessoais',
            key: 'personalData',
            type: 'label',
            variant: 'body1',
            subgroup: 'identification',
            visible: checkIdentification != '',
        },
        {
            name: 'Relação com a empresa',
            key: 'relationForBusiness',
            type: 'label',
            variant: 'h5',
        },
        {
            name: `Relatar infração`,
            key: 'raleteInfration',
            type: 'label',
            variant: 'h5',
        },
    ]

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'Você deseja se identificar?',
            label: 'Você deseja se identificar?',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.SELECT,
            groupKey: 'identification',
            options: [
                {
                    value: 'false',
                    label: 'Não',
                },
                {
                    label: 'true',
                    value: 'yes',
                },
            ],
            renderComponent(params) {
                return (
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Você deseja se identificar?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={checkIdentification}
                                onChange={e => {
                                    setCheckIdentification(e.target.value)
                                }}
                                fullWidth
                                label="Você deseja se identificar?"
                            >
                                <MenuItem value={'false'}>Não</MenuItem>
                                <MenuItem value={'true'}>Sim</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )
            },
        },
        {
            name: 'nome',
            label: 'Qual o seu nome?',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'cargo',
            label: 'Qual o seu cargo?',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'telefone',
            label: 'Qual o seu telefone',
            ui: { grid: 6 },
            required: true,
            groupKey: 'personalData',
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'email',
            label: 'Qual o seu melhor horário para contato',
            ui: { grid: 6 },
            groupKey: 'personalData',
            required: true,
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'email',
            label: 'Qual o seu email?',
            groupKey: 'personalData',
            ui: { grid: checkIdentification && checkIdentification == 'true' ? 6 : 12 },
            required: true,
            componenttype: checkIdentification
                ? ApolloFormSchemaComponentType.TEXT
                : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'area-atuacao',
            label: 'Área de atuação: ',
            groupKey: 'personalData',
            ui: { grid: 6 },
            required: true,
            componenttype:
                checkIdentification == 'true'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'relacao',
            label: 'Qual a sua relação com a XX',
            groupKey: 'relationForBusiness',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    value: 'colaborador',
                    label: 'Colaborador empresa',
                },
                {
                    value: 'exColaborador',
                    label: 'Ex-colaborador da empresa',
                },
                {
                    value: 'exColaborador',
                    label: 'Ex-colaborador da empresa',
                },
                {
                    value: 'cliente',
                    label: 'Cliente da empresa',
                },
                {
                    value: 'fornecedor/prestador/credenciado',
                    label: 'Fornecedor / Prestador/ Credenciado da empresa',
                },
                {
                    value: 'comunidade',
                    label: 'Comunidade no entorno da empresa',
                },
                {
                    value: 'outro',
                    label: 'Outro - Especificar',
                },
            ],
        },
        {
            name: 'infracao',
            label: 'Qual infração do código de ética ocorreu? Link Código de ética',
            groupKey: 'raleteInfration',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'empresa',
            label: 'Em qual empresa você trabalha?',
            groupKey: 'raleteInfration',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
    ]

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
            <Grid container lg={8} xs={12} sx={{ margin: '30px auto' }}>
                {/* <JsonForm
                    schemaForm={schema}
                    values={values}
                    onSubmit={onSubmit}
                    msgSuccess={'Oba! Salvo com sucesso'}
                /> */}

                <ApolloForm
                    schema={formSchema}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    submitButtonText="Gravar"
                    groups={groups}
                />
            </Grid>
        </>
    )
}
export default Form
