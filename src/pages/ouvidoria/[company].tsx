import { Fab, Grid, Typography } from '@mui/material'
import TenantController from 'controllers/tenantController'
import Image from 'next/image'
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
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{
                    height: 650,
                    backgroundImage: `url(${companyInfo?.banner.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                }}
            >
                <Grid
                    lg={8}
                    xs={12}
                    item
                    sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', rowGap: '25px' }}
                >
                    <Typography variant="h1" color={'white'}>
                        {companyInfo?.title_banner}
                    </Typography>
                    <Typography variant="h4" color={'white'} fontWeight="300">
                        {companyInfo?.subtitle_banner}
                    </Typography>
                    <ButtonsGroup />
                </Grid>
            </Grid>
            <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={12} sx={{ padding: '0 20px' }}>
                    <Typography variant="h3" color="#555555" textAlign="center" sx={{ margin: '25px 0' }}>
                        Como funciona
                    </Typography>
                    <Typography variant="h6" fontWeight="normal">
                        {companyInfo?.description}
                    </Typography>
                    <ButtonsGroup size="small" />
                </Grid>
                {/* <Grid item xs={6}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/ouvidor-digital-br.appspot.com/o/d302435c-c8e5-4d36-bc9c-9f5a59d540d4%2Fpublic%2FsecondarySectionBackground?alt=media&token=097f92fe-77fa-40b1-9e55-4f62cd810b78"
                        alt=""
                        width="100%"
                        height="100%"
                    />
                </Grid> */}
            </Grid>
            <Grid
                container
                sx={{ backgroundColor: '#666666', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src="https://canal.ouvidordigital.com.br/images/logo-ouvidor-digital-xlg.png"
                        alt=""
                        width="175px"
                        height="100%"
                    />
                </Grid>
                <Grid item xs={6} sx={{ paddingBottom: '25px' }}>
                    <Typography variant="h3" color="white" textAlign="center" sx={{ margin: '25px 0 5px 0' }}>
                        Quem é o ouvidor digital?
                    </Typography>
                    <Typography variant="h6" fontWeight="300" textAlign="center" color="white">
                        O Ouvidor Digital é uma solução para detectar casos de violação de condutas éticas
                        descumprimento a legislação, que possam afetar o resultado financeiro, a reputação e o ambiente
                        de trabalho da sua empresa.
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Fab
                        variant="extended"
                        sx={{ width: '280px', backgroundColor: '#444444', fontSize: '17px', fontWeight: '300' }}
                    >
                        Saiba mais
                    </Fab>
                </Grid>
            </Grid>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Typography>© Ouvidor Digital 2023 - Todos os direitos reservados</Typography>
            </div>
        </>
    )
}

export default Home
