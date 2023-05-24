import { Grid, InputLabel, TextField } from '@mui/material'
import ComplaintController from 'controllers/complaintController'
import TenantController from 'controllers/tenantController'
import Cookies from 'js-cookie'
import moment from 'moment'
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
import { IComplaint } from 'types/IComplaint'

const Form = ({ values }) => {
    const { enqueueSnackbar } = useSnackbar()

    const [fileFieldValue, setFileFieldValue] = useState<File>()

    const [termAccepted, setTermAccepted] = useState(false)

    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checkIdentification, setCheckIdentification] = useState<string>('')
    const [initialValues, setInitialValues] = useState<any>([])
    const [checkTestemunhas, setCheckTestemunhas] = useState<string>()
    const [checkTipoDenuncia, setCheckTipoDenuncia] = useState<string>()
    const [checkRelacao, setCheckRelacao] = useState<string>()

    const onSubmit = async data => {
        if (!companyInfo) return
        const complaintController = new ComplaintController()

        const formData = {
            ...data,
            'data-ocorrencia': moment(data['data-ocorrencia']).format('YYYY-MM-DD'),
        }

        if (fileFieldValue) {
            try {
                const uploadImageResponse = await complaintController.uploadFile(fileFieldValue)
                const filesIds = [] as string[]
                uploadImageResponse.map(item => filesIds.push(item.id))
                try {
                    const formattedData: IComplaint = {
                        tenant: companyInfo?.id,
                        email: data.email,
                        media: filesIds,
                        response: formData,
                    }
                    const response = await complaintController.sendComplaint(formattedData)
                    enqueueSnackbar('O protocolo é:  ' + response.data.protocol, {
                        autoHideDuration: null,
                    })
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const formattedData: IComplaint = {
                    tenant: companyInfo?.id,
                    email: data.email,
                    response: formData,
                }
                await complaintController.sendComplaint(formattedData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        setLoading(true)
        const getInfo = async () => {
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
        }
        getInfo()

        if (Cookies.get('termoAceito') === 'sim') {
            setTermAccepted(true)
        }
        setLoading(false)
    }, [router.isReady])

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
            value: 'subtracao-de-bens-ou-dinheiro-pessoais',
            label: 'Pessoais',
            group: 'Subtração de bens ou dinheiro',
        },
        {
            value: 'subtracao-de-bens-ou-dinheiro-da-empresa',
            label: 'da Empresa',
            group: 'Subtração de bens ou dinheiro',
        },
        {
            value: 'utilizacao-indevida-de-bens-depreciacao',
            label: 'Depreciação',
            group: 'Utilização indevida',
        },
        {
            value: 'utilizacao-indevida-de-bens-patrimonio',
            label: 'Uso indevido do patrimônio da empresa',
            group: 'Utilização indevida',
        },
        {
            value: 'uso-indevido-da-marca',
            label: 'Uso indevido da marca',
            group: 'Utilização indevida',
        },
        {
            value: 'uso-indevido-de-recursos-da-empresa',
            label: 'Uso indevido de recursos da empresa',
            group: 'Utilização indevida',
        },
        {
            value: 'utilizacao-indevida-de-informacoes privilegiadas',
            label: 'Utilização indevida de informações privilegiadas',
            group: 'Utilização indevida',
        },
        {
            value: 'violacao-de-leis-ambientais',
            label: 'Violação de Leis Ambientais',
            group: 'Meio ambiente',
        },
        {
            value: 'falsificacao-de-documento-da-empresa',
            label: 'Falsificação de documento da empresa',
            group: 'Falsificação',
        },
        {
            value: 'criar-ou-ignorar-perigos-ambientais-ou-de seguranca',
            label: 'Criar/Ignorar perigos ambientais ou de segurança',
            group: 'Perigos',
        },
        {
            value: 'conduta-inadequada-dos-nossos-motoristas-de-transito',
            label: 'Conduta inadequada dos nossos motoristas de trânsito',
            group: 'Conduta',
        },
        {
            value: 'conduta-do-colaborador',
            label: 'Conduta do colaborador',
            group: 'Conduta',
        },
        {
            value: 'conduta-do-gestor',
            label: 'Conduta do gestor',
            group: 'Conduta',
        },
        {
            value: 'relacoes-com-a-comunidade',
            label: 'Relações com a comunidade',
            group: 'Relações',
        },
        {
            value: 'relacoes-com-o-setor-publico',
            label: 'Relações com o Setor Público',
            group: 'Relações',
        },
        {
            value: 'relacoes-com-o-sindicato',
            label: 'Relações com o Sindicato',
            group: 'Relações',
        },
        {
            value: 'vazamento-de-dados-pessoais',
            label: 'Vazamento de dados Pessoais',
            group: 'Outros',
        },
        {
            value: 'corrupcao',
            label: 'Corrupção',
            group: 'Outros',
        },
        {
            value: 'conflito-de-interesses',
            label: 'Conflito de interesses',
            group: 'Outros',
        },
        {
            value: 'fraude',
            label: 'Fraude',
            group: 'Outros',
        },
        {
            value: 'infracao-aos-direitos-humanos-e-discriminacao',
            label: 'Infração aos direitos humanos e discriminação',
            group: 'Outros',
        },
        {
            value: 'descumprimento-de-politicas-normas-ou-procedimentos internos',
            label: 'Descumprimento de Políticas, Normas ou Procedimentos Internos',
            group: 'Outros',
        },
        {
            value: 'destruicao-ou-danos-de-ativos-da-empresa',
            label: 'Destruição ou danos de ativos da empresa',
            group: 'Outros',
        },
        {
            value: 'trabalho-infantil-escravo-ou-forçado',
            label: 'Trabalho infantil, escravo ou forçado',
            group: 'Outros',
        },
        {
            value: 'uso-de-alcool-drogas-ou-porte-e-comercio-de-armas',
            label: 'Uso de alcool, drogas ou porte e comércio de armas',
            group: 'Outros',
        },
        {
            value: 'especificar',
            label: 'Outro - especificar',
            group: 'Outros',
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
            label: 'Qual o seu melhor horário para contato?',
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
                    value: 'ex-colaborador',
                    label: 'Ex-colaborador da empresa',
                },
                {
                    value: 'cliente',
                    label: 'Cliente da empresa',
                },
                {
                    value: 'fornecedor-prestador-credenciado',
                    label: 'Fornecedor / Prestador/ Credenciado da empresa',
                },
                {
                    value: 'comunidade',
                    label: 'Comunidade no entorno da empresa',
                },
                {
                    value: 'especificar',
                    label: 'Outro - Especificar',
                },
            ],
            onChange(e) {
                setCheckRelacao(e.target.value)
            },
        },
        {
            name: 'especificar-tipo-relacao',
            label: 'Especifique o tipo de relação',
            groupKey: 'relationForBusiness',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkRelacao && checkRelacao == 'especificar'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
        },
        {
            name: 'infracao',
            label: 'Qual infração do código de ética ocorreu? Link do Código de ética',
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
            onChangeSelectSearch(e) {
                setCheckTipoDenuncia(e)
            },
        },
        {
            name: 'especificar-tipo-denuncia',
            label: 'Especifique o tipo de denúncia',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            componenttype:
                checkTipoDenuncia === 'especificar'
                    ? ApolloFormSchemaComponentType.TEXT
                    : ApolloFormSchemaComponentType.HIDDEN,
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
            name: 'evidencia',
            label: '',
            groupKey: 'infoRelate',
            ui: { grid: 12 },
            required: true,
            renderComponent(params) {
                return (
                    <Grid item>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">
                                Caso você tenha evidências sobre o fato, faça o upload do arquivo aqui. Tamanho máximo:
                                1GB
                            </InputLabel>
                        </Grid>
                        <TextField
                            type="file"
                            onChange={e => {
                                const target = e.target as HTMLInputElement
                                const files = target.files as FileList
                                setFileFieldValue(files[0])
                            }}
                        />
                    </Grid>
                )
            },
        },
    ]

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
