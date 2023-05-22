import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import TenantController from 'controllers/tenantController'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import ComplaintHistoryCard from 'src/components/ouvidoria/ComplaintHistoryCard'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { ICompanyInfo } from 'types/ICompanyInfo'

function StatusDenunciaPage() {
    const [protocol, setProtocol] = useState('')
    const router = useRouter()
    const company = router.query.company
    const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>()
    const [noCompany, setNoCompany] = useState(false)
    const [loading, setLoading] = useState(false)

    const [historyOfOccurences, setHistoryOfOccurences] = useState('null')

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

    function handleSubmitButton() {
        console.log('protoclo')
    }

    if (loading) return <Loading />

    if (noCompany) return <NoCompany />

    return (
        <>
            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Grid container rowGap="30px" paddingBottom="50px">
                <Grid item lg={8} xs={12} sx={{ margin: '80px auto 0 auto' }}>
                    <Card
                        sx={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '35px',
                            padding: '25px',
                        }}
                    >
                        <Typography variant="h2">Acompanhar relato</Typography>
                        <Typography variant="body1">
                            Insira o número de protocolo no campo abaixo para verificar o status do relato ou enviar
                            novas evidências para o comitê. Através do número de protocolo é possível acompanhar todo o
                            processo de tratamento do seu relato.
                        </Typography>
                        <TextField
                            label="Qual o número de protocolo do seu relato?"
                            onChange={e => setProtocol(e.target.value)}
                            required
                            placeholder=""
                            type="text"
                            id="outlined-basic"
                            fullWidth
                        />
                        <Grid display="flex" flexDirection="column" rowGap="10px">
                            <Button variant="contained" onClick={handleSubmitButton}>
                                Consultar
                            </Button>
                            <Button variant="outlined" onClick={() => router.back()}>
                                Voltar
                            </Button>
                        </Grid>
                    </Card>
                </Grid>
                {historyOfOccurences && (
                    <ComplaintHistoryCard
                        data="18/12/20"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed ipsa sunt officia adipisci hic optio ex, minus nihil tempora odio a ad perferendis aliquam cumque minima atque. Nostrum, saepe?"
                    />
                )}
            </Grid>
        </>
    )
}

export default StatusDenunciaPage
