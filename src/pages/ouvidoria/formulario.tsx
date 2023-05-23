import { Grid, InputLabel, TextField } from '@mui/material'
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
    const [checkTestemunhas, setCheckTestemunhas] = useState<string>()

    const relateTypes = [
        {
            value: 'assedio',
            label: 'Assédio (Moral e/ou sexual)',
            group: 'Assédio',
        },
        {
            value: 'agressao',
            label: 'Agressões físicas',
            group: 'Violência',
        },
        {
            value: 'discriminacao-etnica',
            label: 'Discriminação étnica',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-racial',
            label: 'Discriminação racial',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-social',
            label: 'Discriminação social',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-sexual',
            label: 'Discriminação sexual',
            group: 'Discriminação',
        },
        {
            value: 'discriminacao-física',
            label: 'Discriminação física',
            group: 'Discriminação',
        },
        {
            value: 'favorecimento-fornecedor-concorrencia-desleal',
            label: 'Concorrência desleal',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-fornecedor-suborno',
            label: 'Suborno',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-fornecedor-irregularidade-financeira',
            label: 'Irregularidade financeira',
            group: 'Favorecimento',
        },
        {
            value: 'favorecimento-em-processo-de-recrutamento-e-selecao',
            label: 'Favorecimento em Processo de Recrutamento e Seleção',
            group: 'Favorecimento',
        },
        {
            value: 'utilizacao-indevida-de-bens-depreciacao',
            label: 'Depreciação',
            group: 'Indevido',
        },
        {
            value: 'utilizacao-indevida-de-bens-patrimonio',
            label: 'Utilização indevida do patrimonio Empresa',
            group: 'Indevido',
        },
    ]

    const groups: ApolloFormSchemaGroup[] = [
        {
            name: 'Identificação:',
            key: 'identification',
            type: 'label',
            variant: 'h5',
            visible: true,
        },
        {
            name: 'Dados pessoais:',
            key: 'personalData',
            type: 'label',
            variant: 'body1',
            subgroup: 'identification',
            visible: checkIdentification != '',
        },
        {
            name: 'Relação com a empresa:',
            key: 'relationForBusiness',
            type: 'collapse',
            variant: 'h5',
            visible: true,
        },
        {
            name: `Relatar infração:`,
            key: 'raleteInfration',
            type: 'collapse',
            variant: 'h5',
        },
        {
            name: `Sobre seu relato:`,
            key: 'infoRelate',
            type: 'collapse',
            variant: 'h5',
        },
    ]

    const formSchema: ApolloFormSchemaItem[] = [
        {
            name: 'identificacao',
            label: 'Você deseja se identificar?',
            ui: { grid: 12 },
            componenttype: ApolloFormSchemaComponentType.SELECT,
            groupKey: 'identification',
            required: true,
            options: [
                {
                    value: 'false',
                    label: 'Não',
                },
                {
                    value: 'true',
                    label: 'Sim',
                },
            ],
            onChange(e) {
                setCheckIdentification(e.target.value)
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
        {
            name: 'tipo-denuncia',
            label: 'Qual o tipo de denúncia você deseja relatar?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECTSEARCH,
            options: relateTypes,
        },
        {
            name: 'local-ocorrencia',
            label: 'Onde ocorreu o incidente?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'data-ocorrencia',
            label: 'Quando esse fato ocorreu?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.DATE,
        },
        {
            name: 'autor-ocorrencia',
            label: 'Quem cometeu o incidente? Informe o nome da pessoa e, se possível, mais detalhes como o sobrenome, área e cargo',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.TEXTAREA,
        },
        {
            name: 'recorrencia-ocorrencia',
            label: 'Esse fato continua ocorrendo?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Sim',
                    value: 'sim',
                },
                {
                    label: 'Não',
                    value: 'nao',
                },
                {
                    label: 'Talvez',
                    value: 'talvez',
                },
            ],
        },
        {
            name: 'testemunhas-ocorrencia',
            label: 'Havia testemunhas?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Sim',
                    value: 'sim',
                },
                {
                    label: 'Não',
                    value: 'nao',
                },
            ],
            onChange(e) {
                setCheckTestemunhas(e.target.value)
            },
        },
        {
            name: 'sim-testemunhas-ocorrencia',
            label: 'Cite o nome das testemunhas que estavam presentes',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkTestemunhas && checkTestemunhas == 'sim'
                    ? ApolloFormSchemaComponentType.TEXTAREA
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'nao-testemunhas-ocorrencia',
            label: `Por favor, descreva com o maior nível de detalhes possível o que aconteceu, indicando o(s) nome(s) da(s) pessoa(s) envolvida(s) entre outras informações que você julgar pertinentes. * 0/12.000 caracteres
Escreva o máximo de detalhes possível`,
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkTestemunhas && checkTestemunhas == 'nao'
                    ? ApolloFormSchemaComponentType.TEXTAREA
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'grau-de-certeza-denuncia',
            label: 'Qual o grau de certeza sobre o fato que você está denunciando?',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype: ApolloFormSchemaComponentType.SELECT,
            options: [
                {
                    label: 'Já ouvi dizer',
                    value: 'ja-ouvi-dizer',
                },
                {
                    label: 'Tenho a certeza',
                    value: 'tenho-a-certeza',
                },
                {
                    label: 'Tenho suspeitas',
                    value: 'tenho-suspeitas',
                },
            ],
        },
        {
            name: 'evidência',
            label: 'Caso você tenha evidências sobre o fato video, foto, documento etc) faça o upload do arquivo aqui o tamanho máximo do arquivo 1GB',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Escolha seu arquivo:</InputLabel>
                        </Grid>
                        <TextField type="file" />
                    </Grid>
                )
            },
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
                    submitButtonText="Enviar"
                    groups={groups}
                    defaultExpandedGroup={false}
                />
            </Grid>
        </>
    )
}
export default Form
