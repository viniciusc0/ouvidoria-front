import { Box, Grid, Typography } from '@mui/material'
import TenantController from 'controllers/tenantController'
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
            <AppBar logoUrl={companyInfo?.logo.url as string} />
            <Box sx={{ padding: '30px 10px' }}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <img src={companyInfo?.banner.url} alt="" />
                        {/* height: 650,
                        backgroundImage: `url($)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%', */}
                        {/* }} */}
                    </Grid>
                    <Grid item xs={6}>
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
                        <Typography variant="h6" fontWeight="normal" textAlign={'center'} padding={'0 100px'}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </Typography>
                        <ButtonsGroup size="small" />
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
