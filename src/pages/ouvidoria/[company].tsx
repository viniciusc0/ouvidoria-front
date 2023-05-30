import { Box, Grid, Typography } from '@mui/material'
import TenantController from 'controllers/tenantController'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'
import AppBar from 'src/components/ouvidoria/AppBar'
import { ButtonsGroup } from 'src/components/ouvidoria/ButtonsGroup'
import NoCompany from 'src/components/ouvidoria/NoCompany'
import { ICompanyInfo } from 'types/ICompanyInfo'

function Home() {
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
    }, [router.isReady])

    if (loading) return <Loading />

    if (noCompany) return <NoCompany />

    return (
        <>
            <Head>
                <title>Início</title>
            </Head>

            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Box sx={{ padding: '30px 10px' }}>
                <Grid container alignItems="center" justifyContent="center" rowGap={'10px'}>
                    <Grid item xs={12} lg={6}>
                        <img src={companyInfo?.banner.url} alt="" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" color={'black'} textAlign={'center'}>
                                    {companyInfo?.title_banner}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" color={'black'} fontWeight="300" textAlign={'center'}>
                                    {companyInfo?.subtitle_banner}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonsGroup />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="#555555" textAlign="center" sx={{ margin: '25px 0' }}>
                            Como funciona
                        </Typography>
                        <Typography variant="h6" fontWeight="normal" textAlign={'left'} paddingX={'6%'}>
                            Este é um canal para que colaboradores, clientes, fornecedores, parceiros, prestadores de
                            serviços e sociedade, com contato com a {companyInfo?.identity}, possa relatar de forma
                            segura e se desejada, anônima, qualquer ação de que viole o Código de Ética e Conduta da
                            Empresa.
                            <br />O canal de denúncias é mais que um canal para atendimento a legislação, levamos a
                            sério o compromisso com a dignidade da pessoa humana, e para tanto um pequeno canal se torna
                            a maior ferramenta de diálogo entre empregador e colaboradores, minimizando reclamações
                            trabalhistas, e reduzindo os custos financeiros das demandas judiciais, além de modo
                            profissional tratar as histórias dos colaboradores para os casos de assédio moral, e sexual.
                            <br />
                            Incidentes relacionados a condutas inapropriadas devem ser reportadas nesse site ou pelo
                            telefone, disponível 24 horas por dia e sete dias por semana. Algumas situações que podem
                            ser registradas são: assédio moral/comportamento inadequado; assédio sexual; corrupção;
                            conflito de interesses; fraude; roubos e furtos; uso indevido de informações privilegiadas
                            ou confidenciais. As informações registradas nesse canal serão recebidas e tratadas por uma
                            empresa independente e especializada que tem por obrigação assegurar o sigilo absoluto e o
                            tratamento adequado das informações, sem conflito de interesses.
                            <br />
                            Caso prefira denunciar via Whatsapp também é possível. É comum os casos de que mulheres são
                            vítimas de assédio sexual e moral no trabalho, tendo que esconderem a situação de sua
                            família e colegas de trabalho, com medo de represália, e perda do emprego. Aqui, garantimos
                            seu direito de ser ouvido, bem como, tratamento de forma profissional aos casos denunciados
                            em nosso portal
                        </Typography>
                        <ButtonsGroup />
                    </Grid>
                </Grid>
                <Grid container sx={{ backgroundColor: '#666666', padding: '60px 0 ' }}>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="white" textAlign="center">
                            Lorem ipsu,
                        </Typography>
                        <Typography variant="h6" fontWeight="300" textAlign="center" color="white">
                            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                            velit..."
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography>©2023 - Todos os direitos reservados</Typography>
                </div>
            </Box>
        </>
    )
}

export default Home
