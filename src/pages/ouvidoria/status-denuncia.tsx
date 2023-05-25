import { LoadingButton } from '@mui/lab'
import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import ComplaintController from 'controllers/complaintController'
import TenantController from 'controllers/tenantController'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import { HistoryofOccurencesModal } from 'src/components/ouvidoria/HistoryOfOccurencesModal'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { ICompanyInfo } from 'types/ICompanyInfo'
import { IPostHistory } from 'types/IPostHistory'

function StatusDenunciaPage() {
    const [protocol, setProtocol] = useState('')
    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingComplaints, setLoadingComplaints] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [historyOfOccurences, setHistoryOfOccurences] = useState<IPostHistory[]>()
    const { enqueueSnackbar } = useSnackbar()

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
    }, [router.isReady])

    async function handleSubmitButton() {
        setLoadingComplaints(true)
        const complaintController = new ComplaintController()
        try {
            const response = await complaintController.getHistoryOfComplaint(protocol)
            setHistoryOfOccurences(response.posthistories)
            setOpenModal(true)
        } catch (error) {
            enqueueSnackbar('Protocolo não encontrado!', {
                variant: 'error',
            })
        }
        setLoadingComplaints(false)
    }

    if (loading) return <Loading />

    if (noCompany) return <NoCompany />

    return (
        <>
            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Container>
                <Grid container p={8}>
                    <Grid item xs={12} sx={{ margin: '80px auto 0 auto' }}>
                        <Card
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '35px',
                                padding: '50px',
                                boxShadow: '0 10px 50px 5px rgba(0, 0, 0, .3)',
                            }}
                        >
                            <Typography variant="h4">Acompanhar relato</Typography>
                            <Typography variant="body1">
                                Insira o número de protocolo no campo abaixo para verificar o status do relato ou enviar
                                novas evidências para o comitê. Através do número de protocolo é possível acompanhar
                                todo o processo de tratamento do seu relato.
                            </Typography>
                            <TextField
                                label="Qual o número de protocolo do seu relato?"
                                onChange={e => setProtocol(e.target.value)}
                                required
                                placeholder=""
                                type="text"
                                id="outlined-basic"
                                fullWidth
                                autoComplete={'false'}
                            />
                            <Grid display="flex" flexDirection="row" gap="10px" justifyContent={'right'}>
                                <Button variant="outlined" onClick={() => router.back()}>
                                    Voltar
                                </Button>
                                <LoadingButton
                                    loading={loadingComplaints}
                                    variant="contained"
                                    onClick={handleSubmitButton}
                                >
                                    Consultar
                                </LoadingButton>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            {historyOfOccurences && (
                <HistoryofOccurencesModal history={historyOfOccurences} open={openModal} setOpen={setOpenModal} />
            )}
        </>
    )
}

export default StatusDenunciaPage
