import { Button, Grid, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function TermosAceite({ setTermAccepted }: { setTermAccepted?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { push } = useRouter()

    function handleYesButtonClick() {
        Cookies.set('termoAceito', 'sim')
        if (setTermAccepted) {
            setTermAccepted(true)
        } else {
            push('/ouvidoria/formulario')
        }
    }

    function handleNoButtonClick() {
        push('/ouvidoria')
    }

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid
                item
                sx={{
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                    padding: '30px',
                    boxShadow: '4px 4px 40px -12px rgba(0,0,0,0.20)',
                    marginTop: '30px',
                }}
            >
                <Typography variant="h4" textAlign="center">
                    Termo de aceite
                </Typography>
                <Typography variant="subtitle1" fontWeight="normal" textAlign="center">
                    A veracidade das informações providas é de responsabilidade do relator. Este canal é exclusivo para
                    receber denúncias e não deve ser usado para dúvida, reclamação, solicitação de informação, sugestão
                    ou elogio. Todas as denúncias serão encaminhadas para o Comitê de Ética da empresa Patrus.
                </Typography>
                <Grid>
                    <Typography variant="h6" fontWeight="normal">
                        Você concorda com os termos de aceite? *
                    </Typography>
                    <Typography variant="body2" fontWeight="normal">
                        Ao prosseguir, você declara estar de acordo com o{' '}
                        <Link color="blue" href={'/'}>
                            Termo de Uso e Políticas de Privacidade.
                        </Link>
                        <br />
                        Marque "Sim" para continuar
                    </Typography>
                    <Grid sx={{ display: 'flex', columnGap: '10px', marginTop: '15px' }}>
                        <Button onClick={handleNoButtonClick} variant="outlined" color="success">
                            Não
                        </Button>
                        <Button onClick={handleYesButtonClick} variant="contained" color="success">
                            Sim
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                sx={{ margin: '30px 0', width: '70%', display: 'flex', flexDirection: 'column', rowGap: '30px' }}
                item
            >
                <Grid sx={{ display: 'flex', margin: '0 auto' }}>
                    <Typography variant="body1" fontWeight="bold">
                        Número de protocolo:
                    </Typography>
                    <Typography variant="body1" fontWeight="normal">
                        1684331129697
                    </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="normal" textAlign="center">
                        Anote este número para acompanhar o andamento da sua denúncia. Para consultar o status do
                        registro da denúncia basta inserir o número do protocolo no site:
                    </Typography>
                    <Link href="/" style={{ textAlign: 'center' }}>
                        Página de status
                    </Link>
                </Grid>
                <Grid sx={{ display: 'flex' }}>
                    <Typography variant="body1" fontWeight="normal" textAlign="center">
                        Status disponível após 72 horas exclusivo para denúncias registradas. Casos de dúvida,
                        reclamação, solicitação de informação, pedido, opinião, sugestão, consulta ou elogio estarão com
                        status arquivado.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TermosAceite
