import { useSnackbar } from 'notistack'
import { useState } from 'react'

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Link,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import {
    Iconify,
    NodeRedService,
    useAuth,
    UserManagerService,
} from '@iob360/shared'
import { useRouter } from 'next/router'

import NextLink from 'next/link'

import ReactMarkdown from 'react-markdown'
// import {LoadingScreen} from '@iob360/shared'
// import {DataIngest} from '@iob360/shared'
// import {useLocales} from '@iob360/shared'

import { DataIngest, LoadingScreen, useLocales } from '../../../index'

const RootStyle = styled(Card)(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
        padding: theme.spacing(5),
    },
}))

type Props = {
    plan: {
        id: string
        idKillBillPlan: string
        idProdutoIERP: string
        titulo: string
        subTitulo: string
        ordemExibicao: number
        precoMes: number
        opcoes: Array<any>
        killBillProductName: string
        killBillPrice: number
        isFree: boolean
        isActivePlan: boolean
        termId: string
        descricao?: string
        hasFidelity: boolean
        fidelityText: boolean
    }
    product: any
    setHasActivated: any
    latitude: any
    longitude: any
}

export default function ProductPlanCard({
    plan,
    product,
    setHasActivated,
    latitude,
    longitude,
}: Props) {
    const router = useRouter()
    const { user, reloadUserInfo, getOwnerAccountId } = useAuth('Default')
    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [modalTitle, setModalTitle] = useState<string>('')
    const [modalContent, setModalContent] = useState<string>('')
    const termId = plan.termId
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const {
        id,
        titulo,
        subTitulo,
        precoMes,
        opcoes,
        isFree,
        isActivePlan,
        descricao,
    } = plan
    const lists = opcoes ? opcoes : []
    const ownerAccountId = getOwnerAccountId()
    const { translate } = useLocales()

    const loadTermOfUseProducts = (): string => {
        let str = '\n\r\n\r'

        opcoes.forEach(option => {
            if (option.termOfUse) {
                str = str + `\n\r\n\r`
                str = str + `\n\r\n\r${option.termOfUse}\n\r\n\r`
            }
        })

        return str
    }

    const onClickActivation = (id: string) => {
        setIsLoading(true)

        const activationPlanId = id

        const nodeRedService = new NodeRedService(true)

        if (!termId) {
            enqueueSnackbar(
                'Selecione o aceite e visualize os termos e condições através do link.',
                {
                    variant: 'warning',
                },
            )
            setIsLoading(false)
            return
        }

        if (ownerAccountId) {
            const termOfUseProducts: Array<string> = opcoes
                .filter((item: any) => item.termOfUse)
                .map(item => item.termOfUse as string) as Array<string>

            nodeRedService
                .postPlanActivate(
                    ownerAccountId,
                    activationPlanId,
                    termId,
                    termOfUseProducts,
                    latitude,
                    longitude,
                )
                .then(() => {
                    reloadUserInfo().then(() => {
                        sendTrackEventAction(
                            ownerAccountId,
                            activationPlanId,
                            termId,
                        )
                        enqueueSnackbar('Ativação realizada com sucesso!', {
                            variant: 'success',
                        })
                        setHasActivated(true)
                        setIsLoading(false)
                    })
                })
                .catch((error: any) => {
                    if (error?.response?.status === 409) {
                        enqueueSnackbar(
                            'Cliente já possui plano ativo, não sera possivel continuar.',
                            {
                                variant: 'error',
                            },
                        )
                    } else if (error.isAxiosError) {
                        enqueueSnackbar(
                            'Erro de comunicação com o servidor, por favor tente novamente mais tarde.',
                            { variant: 'error' },
                        )
                    } else {
                        enqueueSnackbar(
                            'Ocorreu um erro não esperado, por favor tente novamente mais tarde.',
                            {
                                variant: 'error',
                            },
                        )
                        console.error(error)
                    }
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const showModalTerms = async () => {
        const userManagerService = new UserManagerService(true)

        const termOfUseProducts = loadTermOfUseProducts()

        await userManagerService.getTerm(termId).then(response => {
            setModalTitle(response.title)

            const content = response.content.replace(
                '##PRODUCT_ANEXO_REPLACE##',
                termOfUseProducts,
            )

            setModalContent(content)
            setModalOpen(true)
        })
    }

    const sendTrackEventAction = async (
        ownerAccountId: string,
        activationPlanId: string,
        termId: string,
    ) => {
        const dataIngest = new DataIngest()

        const trackEvent = {
            eventName: 'ofertas_exclusivas_ativacao',
            trackProperties: [
                {
                    key: 'userId',
                    value: user?.id,
                },
                {
                    key: 'name',
                    value: user?.name,
                },
                {
                    key: 'email',
                    value: user?.email,
                },
                {
                    key: 'mobilePhone',
                    value: user?.mobilePhone,
                },
                {
                    key: 'accountId',
                    value: ownerAccountId,
                },
                {
                    key: 'planId',
                    value: activationPlanId,
                },
                {
                    key: 'termId',
                    value: termId,
                },
                {
                    key: 'planTitulo',
                    value: titulo,
                },
                {
                    key: 'planIsFree',
                    value: isFree,
                },
                {
                    key: 'planPrecoMes',
                    value: precoMes,
                },
            ],
        }

        dataIngest.track(trackEvent)
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            <RootStyle>
                <Typography
                    variant="h6"
                    sx={{ color: 'secondary.main', textAlign: 'center' }}
                >
                    {titulo}
                </Typography>

                {!isFree ? (
                    <Typography
                        variant="body2"
                        sx={{ color: 'secondary.main', my: 2 }}
                    >
                        {translate('components.planCard.forMore')}
                    </Typography>
                ) : (
                    ''
                )}

                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}
                >
                    {!isFree ? (
                        <Typography
                            variant="subtitle1"
                            sx={{ color: 'text.secondary' }}
                        >
                            R$
                        </Typography>
                    ) : (
                        ''
                    )}
                    <Typography variant="h2" sx={{ mx: 1 }}>
                        {isFree
                            ? translate('components.planCard.freeTitle')
                            : precoMes}
                    </Typography>
                    {!isFree ? (
                        <Typography
                            gutterBottom
                            component="span"
                            variant="subtitle2"
                            sx={{
                                alignSelf: 'flex-end',
                                color: 'text.secondary',
                            }}
                        >
                            {translate('components.planCard.month')}
                        </Typography>
                    ) : (
                        ''
                    )}
                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        textTransform: 'capitalize',
                        textAlign: 'center',
                    }}
                >
                    {subTitulo || 'subTitulo'}
                </Typography>

                <Stack spacing={2} sx={{ my: 5, width: 1 }}>
                    {lists.map((item: any, index) => (
                        <Accordion
                            elevation={0}
                            key={index}
                            disabled={item.description == null ? true : false}
                        >
                            <AccordionSummary
                                expandIcon={
                                    item.description != null &&
                                    item.description != '' ? (
                                        <Iconify
                                            icon={'akar-icons:chevron-down'}
                                        />
                                    ) : null
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack
                                    key={item.title}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                    sx={{
                                        typography: 'body2',
                                        color: 'text.primary',
                                        border: 'none',
                                    }}
                                >
                                    <Iconify
                                        icon={'eva:checkmark-fill'}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                    <Typography
                                        sx={{ paddingRight: 1 }}
                                        variant="body2"
                                    >
                                        {item.title}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    {item.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>

                {plan.hasFidelity && (
                    <Typography sx={{ mt: -1, mb: 2 }} variant="caption">
                        {plan.fidelityText}
                    </Typography>
                )}

                {!isActivePlan && (
                    <>
                        <Stack
                            direction="row"
                            spacing={-1.5}
                            alignItems="center"
                            sx={{ alignSelf: 'flex-start' }}
                        >
                            <FormControlLabel
                                label={translate('components.planCard.accept')}
                                control={
                                    <Checkbox
                                        name="terms"
                                        id="terms"
                                        checked={acceptTerms}
                                        onChange={() =>
                                            setAcceptTerms(!acceptTerms)
                                        }
                                    />
                                }
                            />
                            <NextLink
                                key={'infoAcceptTerms'}
                                href={'#termos'}
                                passHref
                            >
                                <Link
                                    noWrap
                                    underline="none"
                                    sx={{
                                        typography: 'body2',
                                        color: 'text.secundary',
                                        fontSize: 14,
                                        transition: theme =>
                                            theme.transitions.create('all'),
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                    onClick={() => showModalTerms()}
                                >
                                    {translate('components.planCard.terms')}
                                </Link>
                            </NextLink>
                        </Stack>
                    </>
                )}
                {!isActivePlan && (
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => {
                            onClickActivation(id)
                        }}
                        disabled={!acceptTerms}
                    >
                        Ativar
                        {/* {isFree ? 'plano Grátis' : ''} */}
                    </Button>
                )}
                {isActivePlan && (
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        disabled={true}
                    >
                        {translate('components.planCard.alreadyPurchased')}
                    </Button>
                )}
            </RootStyle>
            <Dialog
                fullScreen={fullScreen}
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {modalTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <ReactMarkdown>{modalContent}</ReactMarkdown>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseModal}
                        autoFocus
                        variant="contained"
                    >
                        {translate('common.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
